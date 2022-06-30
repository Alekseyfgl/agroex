import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserBetEntity } from './user-bet.entity';
import { CreateBetDto } from './dto/createBet.dto';
import { UserEntity } from '../user/user.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { BetAndAdvertInterface } from './interface/bet.interface';
import { UserIdInBetsType } from '../orders/interface/orders.interface';

@EntityRepository(UserBetEntity)
export class BetRepository extends AbstractRepository<UserBetEntity> {
  async createBet(
    advert: AdvertisementsEntity,
    user: UserEntity,
    betObj: CreateBetDto,
  ): Promise<UserBetEntity> {
    const savedBet: UserBetEntity = await this.repository.save({
      user_id: user.id,
      advertisement_id: advert.id,
      betValue: +betObj.betValue,
    });
    await this.changePreviousBet(advert.id);

    return savedBet;
  }

  async getAdvertisementWithLastBet(
    advert_id: number,
  ): PromiseOptional<BetAndAdvertInterface> {
    const sql = `SELECT * FROM advertisements AS adv
                        LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id where adv.id = ${advert_id}
                        ORDER BY adv."createAt" DESC, ub.created_at DESC
                        limit 1 offset 0`;
    try {
      const advertisement: BetAndAdvertInterface[] =
        await this.repository.query(sql);
      return advertisement[0];
    } catch (e) {
      return null;
    }
  }

  private async changePreviousBet(advert_id: number): Promise<void> {
    const sql = `SELECT * FROM advertisements AS adv
                        LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id where adv.id = ${advert_id}
                        ORDER BY adv."createAt" DESC, ub.created_at DESC
                        limit 1 offset 1`;

    try {
      const penultimateBet: BetAndAdvertInterface[] =
        await this.repository.query(sql);

      if (penultimateBet[0].isActive && penultimateBet.length) {
        await this.repository.update(
          { id: penultimateBet[0].id },
          { isActive: false },
        );
      }
    } catch (e) {}
  }

  async findAllInactiveBets(advertId: number): Promise<UserIdInBetsType[]> {
    return this.repository.find({
      select: ['user_id'],
      where: {
        advertisement_id: advertId,
        isActive: false,
      },
    });
  }
}
