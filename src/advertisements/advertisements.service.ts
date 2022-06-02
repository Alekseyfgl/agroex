import {Injectable} from '@nestjs/common';
import {AdvertisementsRepository} from "./advertisements.repository";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import {
    advertisementForGetBySlug,
    advertisementForResponse,
    advertisementsResponseAll
} from "./advertisements.mapper";
import {AdvertisementsEntity} from "./advertisements.entity";
import {AdvertsResponseInterface, QueryInterface} from "./interface/advertResponseInterface";


@Injectable()
export class AdvertisementsService {

    constructor(private readonly advertisementsRepository: AdvertisementsRepository) {
    }


    async createAdvertisement(currentUser: UserEntity, createAdvertDto: CreateAdvertisementDto): Promise<AdvertisementsEntity> {
        return await this.advertisementsRepository.createAdvertisement(currentUser, createAdvertDto)
    }


    async getAdvertisementBySlug(slug: string): Promise<AdvertisementsEntity> {
        return await this.advertisementsRepository.findBySlug(slug)
    }

    async findAll(currentUserId: number, query: QueryInterface): Promise<AdvertsResponseInterface> {
        const advert: AdvertsResponseInterface = await this.advertisementsRepository.findAll(currentUserId, query)
        return advertisementsResponseAll(advert)
    }

    public buildAdvertisementResponseForCreate(advertisement: AdvertisementsEntity): ReturnType<typeof advertisementForResponse> {
        return advertisementForResponse(advertisement)
    }

    public buildAdvertisementResponseForGetOne(advertisement: AdvertisementsEntity): ReturnType<typeof advertisementForGetBySlug> {
        return advertisementForGetBySlug(advertisement)
    }
}
