import {AbstractRepository, EntityRepository} from "typeorm";
import {OrdersEntity} from "./entities/orders.entity";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import { OrdersInterface} from "./interface/orders.interface";



@EntityRepository(OrdersEntity)
export class OrdersRepository extends AbstractRepository<OrdersEntity> {


    async confirmBet(advert: AdvertisementsEntity): Promise<void> {

        const currentBetId: number = advert.userBets[0].id

        await this.repository.query(`
            INSERT INTO orders (bet_id) VALUES (${currentBetId});
            UPDATE advertisements SET "isConfirmed"=true WHERE id = ${advert.id}`)

    }

    async getAllApprovedAds(currentUserId: number): Promise<OrdersInterface[]> {
        return this.repository.query(
            `SELECT adv.*,
                        u.email, u.username, u.phone, u.password, u.image, u.banned, u."banReason",
                        ub.user_id, ub.created_at, ub."expireBet", ub."betValue" , ub."isActive", ub.advertisement_id,
                        o.id AS order_bet_id, o."dealStatus", o.bet_id, o."orderCreated"
                    FROM advertisements AS adv
                    LEFT JOIN users AS u ON u.id=adv."authorId"
                    LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id
                    INNER JOIN orders AS o ON ub.id = o.bet_id
                    WHERE adv."authorId" = ${currentUserId}`)
    }
}