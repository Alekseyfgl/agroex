import {AbstractRepository, EntityRepository, getRepository} from "typeorm";
import {AdvertisementsEntity} from "./advertisements.entity";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";

import {HttpException, HttpStatus} from "@nestjs/common";
import {DB_RELATIONS_ADVERTISEMENTS_AND_USER, MessageError, ORDER} from "../constans/constans";
import {AdvertsResponseInterface, QueryInterface} from "./interface/advertResponseInterface";
import {createSlug} from "../helper/helper";


@EntityRepository(AdvertisementsEntity)
export class AdvertisementsRepository extends AbstractRepository<AdvertisementsEntity> {


    async createAdvertisement(currentUser: UserEntity, createAdvertDto: CreateAdvertisementDto): Promise<AdvertisementsEntity> {
        const advertisement: AdvertisementsEntity = new AdvertisementsEntity()

        Object.assign(advertisement, createAdvertDto)

        advertisement.slug = createSlug(createAdvertDto.title)
        advertisement.author = currentUser

        return await this.repository.save(advertisement)
    }


    async findBySlug(slug: string): Promise<AdvertisementsEntity> {
        // console.log('slug=====>>>>>', slug)
        const advertisements: AdvertisementsEntity = await this.repository.findOne({slug})


        if (!advertisements) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: [MessageError.ADVERTISEMENT_NOT_FOUND],
                },
                HttpStatus.NOT_FOUND,
            );
        }
        return advertisements
    }

    async findAll(currentUserId: number, query: QueryInterface): Promise<AdvertsResponseInterface> {
        const queryBuilder = getRepository(AdvertisementsEntity)
            .createQueryBuilder(DB_RELATIONS_ADVERTISEMENTS_AND_USER.TABLE)
            .leftJoinAndSelect(DB_RELATIONS_ADVERTISEMENTS_AND_USER.LEFT_JOIN_AND_SELECT, DB_RELATIONS_ADVERTISEMENTS_AND_USER.USER);

        queryBuilder.orderBy(DB_RELATIONS_ADVERTISEMENTS_AND_USER.SORT_COLUMN_BY_CREATE_AT, ORDER.DESC)
        const advertisementCount = await queryBuilder.getCount()//тотал по нашей таблице

        // console.log(query)
        //create limit
        if (query.limit) {
            queryBuilder.limit(query.limit)
        }

        //create offset
        if (query.offset) {
            queryBuilder.offset(query.offset)
        }

        const advertisements: AdvertisementsEntity[] = await queryBuilder.getMany()

        return {advertisements, advertisementCount}
    }
}