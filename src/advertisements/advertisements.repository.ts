import {AbstractRepository, EntityRepository} from "typeorm";
import {AdvertisementsEntity} from "./advertisements.entity";


@EntityRepository(AdvertisementsEntity)
export class AdvertisementsRepository extends AbstractRepository<AdvertisementsEntity> {

    async findAll() {
        return 'qqqqq'
    }
}