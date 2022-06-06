import {AbstractRepository, EntityRepository} from "typeorm";
import {UserBetEntity} from "./user-bet.entity";
import {Body} from "@nestjs/common";
import {CreateBetDto} from "./dto/createBet.dto";


@EntityRepository(UserBetEntity)
export class BetRepository extends AbstractRepository<UserBetEntity> {
    async createBet(createBetDto: CreateBetDto, advertisement, user) {

        const newBet: UserBetEntity = new UserBetEntity()


        // console.log(createBetDto)
        // console.log(advertisement)
        // console.log(user)
        Object.assign(newBet, createBetDto, user, advertisement)

        // console.log('---------XXX-------', newBet)


        await this.repository.save(newBet)
    }


}



