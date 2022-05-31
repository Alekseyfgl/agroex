import {Injectable} from '@nestjs/common';
import {AdvertisementsRepository} from "./advertisements.repository";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import {userForResponse} from "../auth/auth.mapper";
import {advertisementForResponse} from "./advertisements.mapper";
import slugify from "slugify";
import {AdvertisementsEntity} from "./advertisements.entity";


@Injectable()
export class AdvertisementsService {

    constructor(private readonly advertisementsRepository: AdvertisementsRepository) {
    }


    async createAdvertisement(currentUser: UserEntity, createAdvertDto: CreateAdvertisementDto) {
        return await this.advertisementsRepository.createAdvertisement(currentUser, createAdvertDto)
    }


    public buildArticleResponse(advert) {
        console.log('----buildArticleResponse----', advert)
        return {advertisement: advert};
    }


}
