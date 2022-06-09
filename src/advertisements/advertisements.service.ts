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
import {PromiseOptional} from "../interfacesAndTypes/optional.interface";
import {CronJobsService} from "../cron-jobs/cron-jobs.service";


@Injectable()
export class AdvertisementsService {

    constructor(
        private readonly cronJobsService: CronJobsService,
        private readonly advertisementsRepository: AdvertisementsRepository,
    ) {}


    async createAdvertisement(currentUser: UserEntity, createAdvertDto: CreateAdvertisementDto): Promise<AdvertisementsEntity> {
        return await this.advertisementsRepository.createAdvertisement(currentUser, createAdvertDto)
    }


    async getAdvertisementBySlug(slug: string): Promise<AdvertisementsEntity> {
        return await this.advertisementsRepository.findBySlug(slug)
    }

    async findAll(currentUserId: number, query: QueryInterface, isModerated: boolean): Promise<AdvertsResponseInterface> {
        const advert: AdvertsResponseInterface = await this.advertisementsRepository.findAll(currentUserId, query, isModerated)
        return advertisementsResponseAll(advert)
    }

    async setModeratedData(updateAdvertDto: AdvertisementsEntity): Promise<void> {
        await this.setCronJobs(updateAdvertDto);
        await this.advertisementsRepository.updateModeratedData(updateAdvertDto)
    }

    async setCronJobs(updateAdvertDto) {
        if (updateAdvertDto.isModerated) {
            await this.cronJobsService.addCronJob(`checkAdvertisementIsActive-${updateAdvertDto.slug}-${updateAdvertDto.id}-${updateAdvertDto.author.id}`, updateAdvertDto.expireAdvert, updateAdvertDto.id, 'updateAdvertisement');
        }

    }

    public buildAdvertisementResponseForCreate(advertisement: AdvertisementsEntity): ReturnType<typeof advertisementForResponse> {
        return advertisementForResponse(advertisement)
    }

    public buildAdvertisementResponseForGetOne(advertisement: AdvertisementsEntity): ReturnType<typeof advertisementForGetBySlug> {
        return advertisementForGetBySlug(advertisement)
    }
}
