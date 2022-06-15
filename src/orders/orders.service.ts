import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {OrdersRepository} from "./orders.repository";
import {AdvertisementsService} from "../advertisements/advertisements.service";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {allApprovedAdsResponse} from "./orders.mapper";
import {MessageError} from "../constans/constans";


@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository,
                private readonly advertisementsService: AdvertisementsService) {
    }

    async getAllApprovedAds(currentUserId: number) {
        const approvedAds = await this.ordersRepository.getAllApprovedAds(currentUserId)
        return allApprovedAdsResponse(approvedAds)

    }

    async acceptBet(slug: string) {
        const advertBySlug: AdvertisementsEntity = await this.advertisementsService.getAdvertisementBySlug(slug)
        // console.log('advertBySlug===>>>>', advertBySlug)

        const isLastBet = advertBySlug.userBets.length

        if (!isLastBet) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: ['У этой рекламы нет ставок']
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await this.ordersRepository.acceptBet(advertBySlug)
    }
}
