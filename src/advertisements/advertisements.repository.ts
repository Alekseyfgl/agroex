import {AbstractRepository, EntityRepository} from "typeorm";
import {AdvertisementsEntity} from "./advertisements.entity";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import slugify from "slugify";

@EntityRepository(AdvertisementsEntity)
export class AdvertisementsRepository extends AbstractRepository<AdvertisementsEntity> {




    async createAdvertisement(currentUser: UserEntity, createAdvertDto : CreateAdvertisementDto) {
        const advertisement  = new  AdvertisementsEntity()

        console.log('------advertisement-----', advertisement)
        console.log('currentUser===>>>', currentUser)


        Object.assign(advertisement, createAdvertDto)

        advertisement.slug = AdvertisementsRepository.getSlug(createAdvertDto.title)

        advertisement.author = currentUser

        return await this.repository.save(advertisement)
    }


    private static getSlug(title: string): string {
        return slugify(title,{lower: true})+ "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }
}