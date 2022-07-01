import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { BetRepository } from './bet.repository';
import { AdvertisementsService } from '../advertisements/advertisements.service';
import { UserService } from '../user/user.service';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import {
  BetType,
  UserIdInBetsType,
} from '../orders/interface/orders.interface';
import {
  MessageError,
  NOTIFICATIONS_LINKTO,
  NOTIFICATIONS_MESSAGE_LOT_WAS_BOUGHT,
  NOTIFICATIONS_MESSAGE_NEW_BET_WAS_PLACED,
  NOTIFICATIONS_MESSAGES,
  NOTIFICATIONS_TITLE_YOUR_BET_OUTBID, NOTIFICATIONS_TYPES,
} from '../constans/constans';
import { NotificationsService } from '../notifications/notifications.service';
import { BetAndAdvertInterface } from './interface/bet.interface';

@Injectable()
export class BetService {
  constructor(
    private readonly betRepository: BetRepository,
    private readonly advertisementsService: AdvertisementsService,
    private readonly userService: UserService,
    private readonly notificationsService: NotificationsService,
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

    const isMaxBet: boolean = bet.isMaxBet;
    const priceSeller: number = +advert.price;
    const lastBet: number = +advertisementWithLastBet.betValue;
    const currentBet: number = bet.betValue;
    const isActive: boolean = advert.isActive;
    const isConfirmed: boolean = advert.isConfirmed;
    const currentUserId: number = user.id;
    const authorAdvertisementId: number = advert.author.id;
    const userBettedPreviouslyId: number = advertisementWithLastBet.user_id;
    const currency: string = advert.currency

    if (!isActive) {
      throw new HttpException(MessageError.ADVERTISEMENT_IS_NOT_ACTIVE, HttpStatus.BAD_REQUEST)
    }

    if (currentUserId === authorAdvertisementId) {
      throw new HttpException(MessageError.ACCESS_DENIED, HttpStatus.FORBIDDEN)
    }

    if (isConfirmed) {
      throw new HttpException(MessageError.ADVERTISEMENT_ALREADY_CONFIRMED, HttpStatus.NOT_FOUND)
    }

    if (isMaxBet) {
      await this.betRepository.createBet(advert, user, bet);
      // === buy now logic
      if (userBettedPreviouslyId) {
        await this.notificationsService.sendNotifications(
          [userBettedPreviouslyId],
          NOTIFICATIONS_TITLE_YOUR_BET_OUTBID(advert.id.toString(),lastBet.toString(),currency),
          NOTIFICATIONS_MESSAGE_LOT_WAS_BOUGHT(advert.id.toString()),
          NOTIFICATIONS_LINKTO.BETTING,
          NOTIFICATIONS_TYPES.OUTBIDDING
        ); // Your bet on LOT XXX was outbid
      }

      await this.notificationsService.sendNotifications(
        [authorAdvertisementId],
        NOTIFICATIONS_MESSAGE_LOT_WAS_BOUGHT(advert.id.toString()),
        NOTIFICATIONS_MESSAGES.GO_TO_MY_ORDERS_PAGE,
        NOTIFICATIONS_LINKTO.MYORDERS,
        NOTIFICATIONS_TYPES.PURCHASE
      ); // Your LOT XXX is bought at original price.
      return;
    }

    if (currentBet >= priceSeller) {
      throw new HttpException(MessageError.HIGHER_PRICE_THAN_SELLER, HttpStatus.BAD_REQUEST)
    }

    if (lastBet && currentBet <= lastBet) {
      throw new HttpException(MessageError.NEED_TO_REFRESH_THE_PAGE, HttpStatus.CONFLICT)
    }
    await this.betRepository.createBet(advert, user, bet);

    if (advertisementWithLastBet.user_id !== currentUserId) {
      await this.notificationsService.sendNotifications(
        [advertisementWithLastBet.user_id],
        NOTIFICATIONS_TITLE_YOUR_BET_OUTBID(advert.id.toString(), currentBet.toString(), currency),
        NOTIFICATIONS_MESSAGES.GO_TO_MY_BETTINGS_PAGE_NEW_BET,
        NOTIFICATIONS_LINKTO.BETTING,
        NOTIFICATIONS_TYPES.OUTBIDDING
      ); // Your bet on LOT XXX was outbid
    }
    await this.notificationsService.sendNotifications(
      [authorAdvertisementId],
      NOTIFICATIONS_MESSAGE_NEW_BET_WAS_PLACED(advert.id.toString(), currentBet.toString(), advert.currency),
      NOTIFICATIONS_MESSAGES.GO_TO_MY_ADVERTISEMENTS_PAGE,
      NOTIFICATIONS_LINKTO.MY_ADVERTISEMENTS,
      NOTIFICATIONS_TYPES.NEWBET
    ); // A new bet was placed on your LOT XXX
  }

  async getAllInactiveUserBets(advertId: number): Promise<number[]> {
    const foundUserIds: UserIdInBetsType[] =
      await this.betRepository.findAllInactiveBets(advertId);
    return foundUserIds.map((userId) => userId.user_id);
  }
}
