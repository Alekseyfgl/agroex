import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {OrdersRepository} from './orders.repository';
import {AdvertisementsService} from '../advertisements/advertisements.service';
import {AdvertisementsEntity} from '../advertisements/advertisements.entity';
import {allApprovedAdsResponse} from './orders.mapper';
import {ApprovedAdsResponseInterface, BetType, ConfirmedOrdersInterface,} from './interface/orders.interface';
import {UserEntity} from '../user/user.entity';
import {BetService} from '../bets/bet.service';
import {
  MessageError,
  NOTIFICATIONS_LINKTO,
  NOTIFICATIONS_MESSAGE_LOT_HAS_ENDED,
  NOTIFICATIONS_MESSAGE_YOUR_BET_WAS_CONFIRMED,
  NOTIFICATIONS_MESSAGES,
  NOTIFICATIONS_TYPES,
} from '../constans/constans';
import {NotificationsService} from '../notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly advertisementsService: AdvertisementsService,
    private readonly betService: BetService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async getAllApprovedAds(
    currentUserId: number,
  ): Promise<ApprovedAdsResponseInterface[]> {
    const approvedAds: ConfirmedOrdersInterface[] =
      await this.ordersRepository.getAllApprovedAds(currentUserId);
    return allApprovedAdsResponse(approvedAds);
  }

  async confirmBet(currentUser: UserEntity, slug: string): Promise<void> {
    const advertBySlug: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);

    const isConfirmed: boolean = advertBySlug.isConfirmed;
    const isLastBet: number = advertBySlug.userBets.length;
    const inactiveUsersBetsIds: number[] =
      await this.betService.getAllInactiveUserBets(advertBySlug.id);

    if (currentUser.id !== advertBySlug.author.id) {
      throw new HttpException(MessageError.ACCESS_DENIED, HttpStatus.FORBIDDEN)
    }

    if (isConfirmed) {
      throw new HttpException(MessageError.ADVERTISEMENT_ALREADY_CONFIRMED, HttpStatus.NOT_FOUND)
    }

    if (!isLastBet) {
      throw new HttpException(MessageError.ADVERTISEMENT_HAS_NOT_BETS, HttpStatus.NOT_FOUND)
    }

    await this.ordersRepository.confirmBet(advertBySlug);
    await this.notificationsService.sendNotifications(
      [advertBySlug.userBets[0].user_id],
      NOTIFICATIONS_MESSAGE_YOUR_BET_WAS_CONFIRMED(advertBySlug.id.toString()),
      NOTIFICATIONS_MESSAGES.GO_TO_MY_ORDERS_PAGE,
      NOTIFICATIONS_LINKTO.MYORDERS,
      NOTIFICATIONS_TYPES.CONFIRMATION
    ); // Your bet on LOT XXX was confirmed
    await this.notificationsService.sendNotifications(
      inactiveUsersBetsIds,
      NOTIFICATIONS_MESSAGE_LOT_HAS_ENDED(advertBySlug.id.toString()),
      NOTIFICATIONS_MESSAGES.CHOOSE_ANOTHER_LOT,
      NOTIFICATIONS_LINKTO.EMPTY,
      NOTIFICATIONS_TYPES.OUTBIDDING
    ); // The LOT XXX in which you participated has ended
  }

  async buyNow(currentUser: UserEntity, slug: string): Promise<void> {
    const advertBySlug: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);

    const maxBet: BetType = {
      isMaxBet: true,
      betValue: advertBySlug.price,
    };

    await this.betService.createBet(maxBet, currentUser, advertBySlug.slug);

    const updatedAdBySlug: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);

    if (updatedAdBySlug.isConfirmed) {
      throw new HttpException(MessageError.ADVERTISEMENT_ALREADY_CONFIRMED, HttpStatus.NOT_FOUND)
    }
    await this.ordersRepository.confirmBet(updatedAdBySlug);
  }
}
