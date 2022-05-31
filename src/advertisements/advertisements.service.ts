import {Injectable} from '@nestjs/common';
import {AdvertisementsRepository} from "./advertisements.repository";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import {advertisementForResponse} from "./advertisements.mapper";
import {AdvertisementsEntity} from "./advertisements.entity";



@Injectable()
export class AdvertisementsService {

    constructor(private readonly advertisementsRepository: AdvertisementsRepository) {
    }


    async createAdvertisement(currentUser: UserEntity, createAdvertDto: CreateAdvertisementDto) {
        return await this.advertisementsRepository.createAdvertisement(currentUser, createAdvertDto)
    }


    public buildArticleResponse(advert: AdvertisementsEntity): ReturnType<typeof advertisementForResponse> {
        // console.log('----buildArticleResponse----', advert)
        return advertisementForResponse(advert)
    }


}
