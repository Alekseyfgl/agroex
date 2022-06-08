import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserBetEntity } from './user-bet.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { UserEntity } from '../user/user.entity';
import { CreateBetDto } from './dto/createBet.dto';
import { betAndAdvertInterface } from './interface/bet.interface';
import { Optional } from '../interfacesAndTypes/optional.interface';

@EntityRepository(UserBetEntity)
export class BetRepository extends AbstractRepository<UserBetEntity> {
  async createBet(
    advert: AdvertisementsEntity,
    user: UserEntity,
    betObj: CreateBetDto,
  ): Promise<void> {
    const betData: UserBetEntity = new UserBetEntity();
    Object.assign(betData, {
      user_id: user.id,
      advertisement_id: advert.id,
      betValue: +betObj.betValue,
    });

    await this.repository.save(betData);
    await this.changePreviousBet(advert.id);
  }

  private async changePreviousBet(advert_id: number): Promise<void> {
    const sql = `SELECT * FROM advertisements AS adv
                    LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id where adv.id = ${advert_id}
                    ORDER BY adv."createAt" DESC, ub.created_at DESC
                    limit 1 offset 1`;

    try {
      const penultimateBet: Optional<betAndAdvertInterface[]> =
        await this.repository.query(sql);
      if (penultimateBet[0].isActive && penultimateBet.length) {
        await this.repository.update(
          { id: penultimateBet[0].id },
          { isActive: false },
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
}
