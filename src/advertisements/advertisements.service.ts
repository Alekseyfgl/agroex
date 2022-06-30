import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdvertisementsRepository } from './advertisements.repository';
import { UserEntity } from '../user/user.entity';
import { CreateAdvertisementDto } from './dto/createAdvertisement.dto';
import {
  advertisementForGetBySlug,
  advertisementForResponse,
  advertisementsResponseAll,
  userAdsWithActiveBets,
} from './advertisements.mapper';
import { AdvertisementsEntity } from './advertisements.entity';
import {
  AdvertsResponseInterface,
  UserAdsAndWithBets,
  UserAdsWithBetsResponse,
} from './interface/advertResponseInterface';
import { CronJobsService } from '../cron-jobs/cron-jobs.service';
import {
  MessageError,
  NOTIFICATIONS_LINKTO,
  NOTIFICATIONS_MESSAGE_YOUR_LOT_WAS_APPROVED,
  NOTIFICATIONS_MESSAGE_YOUR_LOT_WAS_REJECTED,
  NOTIFICATIONS_MESSAGES, NOTIFICATIONS_TYPES,
} from '../constans/constans';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { QueryDto } from './dto/query.dto';
import {Filterobj, ModerationStatus} from './interface/interfacesAndTypes';
import {NotificationsService} from "../notifications/notifications.service";



@Injectable()
export class AdvertisementsService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly cronJobsService: CronJobsService,
    private readonly advertisementsRepository: AdvertisementsRepository,
  ) {}

  async createAdvertisement(
    currentUser: UserEntity,
    createAdvertDto: CreateAdvertisementDto,
  ): Promise<AdvertisementsEntity> {
    return await this.advertisementsRepository.createAdvertisement(
      currentUser,
      createAdvertDto,
    );
  }

  async getAdvertisementBySlug(
    slug: string,
    filterObj?: Filterobj,
  ): Promise<AdvertisementsEntity> {
    return await this.advertisementsRepository.findBySlug(slug, filterObj);
  }

  async findAll(
    query: QueryDto,
    filterObj?: Filterobj,
  ): Promise<AdvertsResponseInterface> {
    const advert: AdvertsResponseInterface =
      await this.advertisementsRepository.findAll(query, filterObj);

    return advertisementsResponseAll(advert);
  }

  async getAdsWithBetByAuthor(
    currentUserId: number,
  ): Promise<UserAdsWithBetsResponse[]> {
    const ads: UserAdsAndWithBets[] =
      await this.advertisementsRepository.findAdsWithBetByUser(currentUserId);
    return userAdsWithActiveBets(ads);
  }

  async setModeratedData(
    updateAdvertDto: AdvertisementsEntity,
  ): PromiseOptional<void> {
    const existAdData: AdvertisementsEntity =
      await this.advertisementsRepository.findBySlug(updateAdvertDto.slug);

    if (existAdData.isModerated) {
      throw new HttpException(MessageError.ADVERTISEMENT_IS_ALREADY_MODERATED, HttpStatus.BAD_REQUEST)
    } else
      await this.advertisementsRepository.updateModeratedData(updateAdvertDto);

    if (updateAdvertDto.moderationStatus === ModerationStatus.APPROVED) {
      await this.notificationsService.sendNotifications(
        [existAdData.author.id],
        NOTIFICATIONS_MESSAGE_YOUR_LOT_WAS_APPROVED(existAdData.id.toString()),
        NOTIFICATIONS_MESSAGES.NOW_YOUR_LOT_IS_SHOWN,
        NOTIFICATIONS_LINKTO.EMPTY,
        NOTIFICATIONS_TYPES.MODERATIONAPPROVED
      ); // Your LOT was approved by moderator
    } else if (updateAdvertDto.moderationStatus === ModerationStatus.REJECTED) {
      await this.notificationsService.sendNotifications(
        [existAdData.author.id],
        NOTIFICATIONS_MESSAGE_YOUR_LOT_WAS_REJECTED(existAdData.id.toString()),
        NOTIFICATIONS_MESSAGES.GO_TO_MY_ADVERTISEMENTS_PAGE_CHANGE,
        NOTIFICATIONS_LINKTO.MY_ADVERTISEMENTS,
        NOTIFICATIONS_TYPES.MODERATIONREJECTED
      ); // Your LOT was rejected by moderator
    }

    const savedAdData: AdvertisementsEntity =
      await this.advertisementsRepository.findBySlug(updateAdvertDto.slug);

    if (savedAdData.isActive) {
      await this.setCronJobs(savedAdData);
    }
  }

  async setCronJobs(updateAdvertDto): PromiseOptional<void> {
    await this.cronJobsService.addCronJob(
      `checkAdvertisementIsActive-${updateAdvertDto.slug}-${updateAdvertDto.id}-${updateAdvertDto.author.id}`,
      updateAdvertDto.expireAdvert,
      updateAdvertDto.id,
      'updateAdvertisement',
    );
  }

  async setUpdatedAd(currentUser, updateAdvertDto): PromiseOptional<void> {
    const existAdData: AdvertisementsEntity =
      await this.advertisementsRepository.findBySlug(updateAdvertDto.slug);

    if (existAdData.author.id !== currentUser.id) {
      throw new HttpException(MessageError.ACCESS_DENIED, HttpStatus.FORBIDDEN)
    }

    if (existAdData.isActive || existAdData.isConfirmed) {
      throw new HttpException(MessageError.ADVERTISEMENT_CAN_NOT_BE_CHANGED, HttpStatus.BAD_REQUEST)
    }

    await this.advertisementsRepository.updateAdData(updateAdvertDto);
  }

  public buildAdvertisementResponseForCreate(
    advertisement: AdvertisementsEntity,
  ): ReturnType<typeof advertisementForResponse> {
    return advertisementForResponse(advertisement);
  }

  public buildAdvertisementResponseForGetOne(
    advertisement: AdvertisementsEntity,
  ): ReturnType<typeof advertisementForGetBySlug> {
    return advertisementForGetBySlug(advertisement);
  }
}
