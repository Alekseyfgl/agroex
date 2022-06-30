import { AbstractRepository, EntityRepository } from 'typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { ConfirmedOrdersInterface } from './interface/orders.interface';

@EntityRepository(OrdersEntity)
export class OrdersRepository extends AbstractRepository<OrdersEntity> {
  async confirmBet(advert: AdvertisementsEntity): Promise<void> {
    const currentBetId: number = advert.userBets[0].id;

    await this.repository.query(`
            INSERT INTO orders (bet_id) VALUES (${currentBetId});
            UPDATE advertisements SET "isConfirmed"=true , "isActive"=false WHERE id = ${advert.id}`);
  }

  async getAllApprovedAds(currentUserId: number): Promise<any> {
    return this.repository.query(
      `SELECT adv."isActive" AS "isActiveAdv",  adv.*,
                        u.email, u.username, u.phone, u.password, u.image, u.banned, u."banReason",
                        ub.user_id, ub.created_at, ub."betValue" , ub."isActive", ub.advertisement_id,
                        o.id AS order_bet_id, o."dealStatus", o.bet_id, o."orderCreated"
                    FROM advertisements AS adv
                    LEFT JOIN users AS u ON u.id=adv."authorId"
                    LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id
                    INNER JOIN orders AS o ON ub.id = o.bet_id
                    WHERE adv."authorId" = ${currentUserId} OR ub.user_id = ${currentUserId}
                     ORDER BY o."orderCreated" DESC`,
    );
  }
}
