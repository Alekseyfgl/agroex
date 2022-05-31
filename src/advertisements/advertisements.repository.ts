import {AbstractRepository, EntityRepository} from "typeorm";
import {AdvertisementsEntity} from "./advertisements.entity";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import slugify from "slugify";
import {HttpException, HttpStatus} from "@nestjs/common";
import {MessageError} from "../constans/constans";

@EntityRepository(AdvertisementsEntity)
export class AdvertisementsRepository extends AbstractRepository<AdvertisementsEntity> {


    async createAdvertisement(currentUser: UserEntity, createAdvertDto: CreateAdvertisementDto): Promise<AdvertisementsEntity> {
        const advertisement: AdvertisementsEntity = new AdvertisementsEntity()

        // console.log('------advertisement-----', advertisement)
        // console.log('currentUser===>>>', currentUser)
        Object.assign(advertisement, createAdvertDto)

        advertisement.slug = AdvertisementsRepository.createSlug(createAdvertDto.title)
        advertisement.author = currentUser

        return await this.repository.save(advertisement)
    }


    private static createSlug(title: string): string {
        return slugify(title, {lower: true}) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }

    async findBySlug(slug: string): Promise<AdvertisementsEntity> {
        const  advert = await this.repository.findOne({slug})

        if(!advert) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: [MessageError.ADVERTISEMENT_NOT_FOUND],
                },
                HttpStatus.NOT_FOUND,
            );
        }

        return  advert
    }
}