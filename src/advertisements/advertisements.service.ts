import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdvertisementsRepository } from './advertisements.repository';
import { UserEntity } from '../user/user.entity';
import { CreateAdvertisementDto } from './dto/createAdvertisement.dto';
import {
  advertisementForGetBySlug,
  advertisementForResponse,
  advertisementsResponseAll,
} from './advertisements.mapper';
import { AdvertisementsEntity } from './advertisements.entity';
import { AdvertsResponseInterface } from './interface/advertResponseInterface';
import { CronJobsService } from '../cron-jobs/cron-jobs.service';
import { MessageError } from '../constans/constans';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { QueryDto } from './dto/query.dto';
import {Filterobj} from "./interface/interfacesAndTypes";

@Injectable()
export class AdvertisementsService {
  constructor(
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
    return await this.advertisementsRepository.findBySlug(
      slug,
      filterObj,
    );
  }

  async findAll(
    query: QueryDto,
    filterObj?: Filterobj,
  ): Promise<AdvertsResponseInterface> {
    const advert: AdvertsResponseInterface =
      await this.advertisementsRepository.findAll(
        query,
        filterObj,
      );
    return advertisementsResponseAll(advert);
  }

  async setModeratedData(
    updateAdvertDto: AdvertisementsEntity,
  ): PromiseOptional<void> {
    const existAdData: AdvertisementsEntity =
      await this.advertisementsRepository.findBySlug(updateAdvertDto.slug);

    if (existAdData.isModerated) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageError.ADVERTISEMENT_IS_ALREADY_MODERATED],
        },
        HttpStatus.BAD_REQUEST,
      );
    } else
      await this.advertisementsRepository.updateModeratedData(updateAdvertDto);

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
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: [MessageError.ACCESS_DENIED],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (existAdData.isActive) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageError.ADVERTISEMENT_CAN_NOT_BE_CHANGED],
        },
        HttpStatus.BAD_REQUEST,
      );
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
