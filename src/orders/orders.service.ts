import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { AdvertisementsService } from '../advertisements/advertisements.service';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { allApprovedAdsResponse } from './orders.mapper';
import {
  ApprovedAdsResponseInterface,
  ConfirmedOrdersInterface,
} from './interface/orders.interface';
import { UserEntity } from '../user/user.entity';
import { BetService } from '../bets/bet.service';
import { MessageError } from '../constans/constans';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly advertisementsService: AdvertisementsService,
    private readonly betService: BetService,
  ) {}

  async getAllApprovedAds(
    currentUserId: number,
  ): Promise<ApprovedAdsResponseInterface[]> {
    const approvedAds: ConfirmedOrdersInterface[] =
      await this.ordersRepository.getAllApprovedAds(currentUserId);
    // console.log('approvedAds=====>>>', approvedAds)
    return allApprovedAdsResponse(approvedAds);
  }

  async confirmBet(currentUser: UserEntity, slug: string): Promise<void> {
    const advertBySlug: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);

    const isConfirmed: boolean = advertBySlug.isConfirmed;
    const isLastBet: number = advertBySlug.userBets.length;

    if (currentUser.id !== advertBySlug.author.id) {
      throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: [MessageError.ACCESS_DENIED],
          },
          HttpStatus.FORBIDDEN,
      );
    }

    if (isConfirmed) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: [MessageError.ADVERTISEMENT_ALREADY_CONFIRMED],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!isLastBet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: [MessageError.ADVERTISEMENT_HAS_NOT_BETS],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.ordersRepository.confirmBet(advertBySlug);
  }

  async buyNow(currentUser: UserEntity, slug: string): Promise<void> {
    const advertBySlug: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);
    const maxBet = { betValue: advertBySlug.price };

    await this.betService.createBet(maxBet, currentUser, advertBySlug.slug);

    const updatedAdBySlug: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);

    if (updatedAdBySlug.isConfirmed) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: [MessageError.ADVERTISEMENT_ALREADY_CONFIRMED],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.ordersRepository.confirmBet(updatedAdBySlug);
  }
}
