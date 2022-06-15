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

    async acceptBet(currentUser, slug: string) {
        const advertBySlug: AdvertisementsEntity = await this.advertisementsService.getAdvertisementBySlug(slug)

        if (advertBySlug.userBets[0].betValue) {
            await this.ordersRepository.acceptBet(advertBySlug)
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: ['У этой рекламы нет ставок']
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
