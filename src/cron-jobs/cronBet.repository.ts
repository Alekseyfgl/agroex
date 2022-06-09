import { UserBetEntity } from "../bet/user-bet.entity";
import {AbstractRepository, EntityRepository} from "typeorm";


@EntityRepository(UserBetEntity)
export class CronBetRepository extends AbstractRepository<UserBetEntity> {

    async updateColumnIsActive(betId: number): Promise<void> {

        await this.repository.update({
            id: betId,
            isActive: true
        },{
            isActive: false
        })

    }


}



