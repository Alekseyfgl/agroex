import {AbstractRepository, EntityRepository} from "typeorm";
import {UserBetEntity} from "./user-bet.entity";
import {Body} from "@nestjs/common";
import {CreateBetDto} from "./dto/createBet.dto";
import {UserEntity} from "../user/user.entity";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";


@EntityRepository(UserBetEntity)
export class BetRepository extends AbstractRepository<UserBetEntity> {
    async createBet(advert, user, betObj) {


        const betData: UserBetEntity = new UserBetEntity();
        Object.assign(betData, {
            user_id: user.id,
            advertisement_id: advert.id,
            betValue: +betObj.betValue
        })


        // const rawData = await this.repository.query(`INSERT INTO "userBets" (user_id, "betValue", advertisement_id) VALUES (${user.id},${currentBet},${advert.id});`)
        // const join = await this.repository.query(`SELECT * FROM advertisements INNER JOIN "userBets" ON advertisements.id = "userBets".advertisement_id;`)
        // await this.repository.save(rawData)
        return await this.repository.save(betData)
    }


}



