import {AbstractRepository, EntityRepository} from "typeorm";
import {UserBetEntity} from "./user-bet.entity";
import {Body} from "@nestjs/common";
import {CreateBetDto} from "./dto/createBet.dto";


@EntityRepository(UserBetEntity)
export class BetRepository extends AbstractRepository<UserBetEntity> {
    async createBet(advert, user, bet) {


        const currentBet = Object.values(bet)[0]
        //


        const rawData = await this.repository.query(`INSERT INTO "userBets" (user_id, "betValue", advertisement_id) VALUES (${user.id},${currentBet},${advert.id});`)
        // const join = await this.repository.query(`SELECT * FROM advertisements INNER JOIN "userBets" ON advertisements.id = "userBets".advertisement_id;`)
        //
        // await this.repository.save(rawData)
        //
      await this.repository.save(rawData)
    }


}



