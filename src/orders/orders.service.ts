import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { AdvertisementsService } from '../advertisements/advertisements.service';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { allApprovedAdsResponse } from './orders.mapper';
import {
  ApprovedAdsResponseInterface,
  BetType,
  ConfirmedOrdersInterface,
} from './interface/orders.interface';
import { UserEntity } from '../user/user.entity';
import { BetService } from '../bets/bet.service';
import { MessageError, NOTIFICATIONS_MESSAGES } from '../constans/constans';
import {NotificationsService} from "../notifications/notifications.service";

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly advertisementsService: AdvertisementsService,
    private readonly betService: BetService,
    private readonly notificationsService: NotificationsService
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
    await this.notificationsService.sendNotifications([advertBySlug.userBets[0].user_id], `Your bet on LOT ${advertBySlug.title} was confirmed`, NOTIFICATIONS_MESSAGES.GO_TO_MY_ORDERS_PAGE) // Your bet on LOT XXX was confirmed
    await this.notificationsService.sendNotifications([currentUser.id], `You confirmed the deal with LOT ${advertBySlug.title}`, NOTIFICATIONS_MESSAGES.GO_TO_MY_ORDERS_PAGE) // You confirmed the deal with LOT XXX
  }

  async buyNow(currentUser: UserEntity, slug: string): Promise<void> {
    const advertBySlug: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);

    const maxBet: BetType = {
      status: 'buy-now',
      betValue: advertBySlug.price,
    };

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

    await this.notificationsService.sendNotifications([currentUser.id], `You bought LOT ${advertBySlug.title} at original price`, NOTIFICATIONS_MESSAGES.GO_TO_MY_ORDERS_PAGE) // For Buyer
  }
}
