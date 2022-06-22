import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { BetRepository } from './bet.repository';
import { AdvertisementsService } from '../advertisements/advertisements.service';
import { UserService } from '../user/user.service';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { BetType } from '../orders/interface/orders.interface';
import {MessageError, NOTIFICATIONS_MESSAGES, NOTIFICATIONS_TITLES} from '../constans/constans';
import {NotificationsService} from "../notifications/notifications.service";

@Injectable()
export class BetService {
  constructor(
    private readonly betRepository: BetRepository,
    private readonly advertisementsService: AdvertisementsService,
    private readonly userService: UserService,
    private readonly notificationsService: NotificationsService
  ) {}

  async createBet(
    bet: BetType,
    currentUser: UserEntity,
    slug: string,
  ): Promise<void> {
    const advert: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);
    const user: UserEntity = await this.userService.getUserById(currentUser);

    const advertisementWithLastBet: BetAndAdvertInterface =
      await this.betRepository.getAdvertisementWithLastBet(advert.id);

    const isMaxBet: string = bet.status;
    const priceSeller: number = +advert.price;
    const lastBet: number = +advertisementWithLastBet.betValue;
    const currentBet: number = bet.betValue;
    const isActive: boolean = advert.isActive;
    const isConfirmed: boolean = advert.isConfirmed;
    const currentUserId: number = user.id;
    const authorAdvertisement: number = advert.author.id;

    if (!isActive) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageError.ADVERTISEMENT_IS_NOT_ACTIVE],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (currentUserId === authorAdvertisement) {
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

    if (isMaxBet) {
      await this.betRepository.createBet(advert, user, bet);
      return;
    }

    if (currentBet >= priceSeller) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageError.HIGHER_PRICE_THAN_SELLER],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (lastBet && currentBet <= lastBet) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: [MessageError.NEED_TO_REFRESH_THE_PAGE],
        },
        HttpStatus.CONFLICT,
      );
    }
    await this.betRepository.createBet(advert, user, bet);

    await this.notificationsService.sendNotifications([advertisementWithLastBet.user_id], `Your bet on LOT ${advert.title} was outbid`, NOTIFICATIONS_MESSAGES.GO_TO_MY_BETTINGS_PAGE_NEW_BET) // Your bet on LOT XXX was outbid
    await this.notificationsService.sendNotifications([authorAdvertisement], `A new bet was placed on your LOT ${advert.title}`, NOTIFICATIONS_MESSAGES.GO_TO_MY_ADVERTISEMENTS_PAGE) // A new bet was placed on your LOT XXX
    await this.notificationsService.sendNotifications([currentUserId], `You betted on LOT ${advert.title}`, NOTIFICATIONS_MESSAGES.GO_TO_MY_BETTINGS_PAGE_YOUR_BET) // You betted on LOT XXX
  }
}
