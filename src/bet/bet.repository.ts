import {AbstractRepository, EntityRepository} from "typeorm";
import {BetEntity} from "./entities/bet.entity";


@EntityRepository(BetEntity)
export class BetRepository extends AbstractRepository<BetEntity> {
    async createBet() {
        return 'qqq'
    }
}