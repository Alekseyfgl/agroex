import {AbstractRepository, EntityRepository} from "typeorm";
import {UserBetEntity} from "./user-bet.entity";
import {Body} from "@nestjs/common";
import {CreateBetDto} from "./dto/createBet.dto";


@EntityRepository(UserBetEntity)
export class BetRepository extends AbstractRepository<UserBetEntity> {
    async createBet(advert, user, betObj) {

       // const currentBet = Object.values(bet)[0]

        const betData: UserBetEntity = new UserBetEntity();
        Object.assign(betData, {
            user_id: user.id,
            advertisement_id: advert.id,
            betValue: +betObj.bet
        })
        //const rawData = await this.repository.query(`INSERT INTO "userBets" (user_id, "betValue", advertisement_id) VALUES (${user.id},${currentBet},${advert.id});`)

        return await this.repository.save(betData)


    }


}



