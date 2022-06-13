import {
    AbstractRepository,
    EntityRepository,
    getRepository,
    SelectQueryBuilder
} from "typeorm";
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
        const advertisements: AdvertisementsEntity = await this.repository.findOne({

            where: {slug: slug}
        })

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


    async findAll(currentUserId: number, query: QueryInterface, isModerated: boolean, isActive: boolean): Promise<AdvertsResponseInterface> {
        const queryBuilder: SelectQueryBuilder<AdvertisementsEntity> = getRepository(AdvertisementsEntity)
            .createQueryBuilder(DB_RELATIONS_ADVERTISEMENTS_AND_USER.TABLE)
            .leftJoinAndSelect(DB_RELATIONS_ADVERTISEMENTS_AND_USER.LEFT_JOIN_AND_SELECT,
                DB_RELATIONS_ADVERTISEMENTS_AND_USER.USER)

            .leftJoinAndSelect(DB_RELATIONS_ADVERTISEMENTS_AND_USER.LEFT_JOIN_AND_SELECT_USERBETS,
                DB_RELATIONS_ADVERTISEMENTS_AND_USER.USERBETS,
                DB_RELATIONS_ADVERTISEMENTS_AND_USER.USERBETS_IS_ACTIVE, {isActive: true})

            .where(DB_RELATIONS_ADVERTISEMENTS_AND_USER.ISMODERATED,
                {
                    isModerated: isModerated,
                })
            .andWhere(DB_RELATIONS_ADVERTISEMENTS_AND_USER.ISACTIVE, {
                isActive: isActive
            })

            .addOrderBy(DB_RELATIONS_ADVERTISEMENTS_AND_USER.SORT_COLUMN_BY_CREATE_AT, `${isModerated ? ORDER.DESC : ORDER.ASC}`)
            .addOrderBy(DB_RELATIONS_ADVERTISEMENTS_AND_USER.SORT_BETS_BY_CREATE_AT, ORDER.DESC);


        const advertisementCount: number = await queryBuilder.getCount()//тотал по нашей таблице
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


    async updateModeratedData(updateAdvertDto: AdvertisementsEntity): Promise<void> {

        if (await this.findBySlug(updateAdvertDto.slug)) {
            await this.repository.update({
                slug: updateAdvertDto.slug,
            }, {
                isModerated: updateAdvertDto.isModerated,
                moderationComment: updateAdvertDto.moderationComment,
                isActive: updateAdvertDto.isModerated
            })
        }
    }
}