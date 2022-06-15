import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {OrdersRepository} from "./orders.repository";
import {AdvertisementsService} from "../advertisements/advertisements.service";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {allApprovedAdsResponse} from "./orders.mapper";
import {MessageError} from "../constans/constans";
import {OrdersInterface} from "./interface/orders.interface";


@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository,
                private readonly advertisementsService: AdvertisementsService) {
    }

    async getAllApprovedAds(currentUserId: number) {
        const approvedAds: OrdersInterface[] = await this.ordersRepository.getAllApprovedAds(currentUserId)
        return allApprovedAdsResponse(approvedAds)
    }

    async acceptBet(slug: string): Promise<void> {
        const advertBySlug: AdvertisementsEntity = await this.advertisementsService.getAdvertisementBySlug(slug)

        const isConfirmed: boolean = advertBySlug.isConfirmed
        const isLastBet: number = advertBySlug.userBets.length

        if (isConfirmed) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: ['Это реклама уже подтверждена']
                },
                HttpStatus.NOT_FOUND,
            );
        }

        if (!isLastBet) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: ['У данной рекламы нет ставок']
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await this.ordersRepository.acceptBet(advertBySlug)
    }
}
