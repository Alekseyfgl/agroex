import {
  AbstractRepository,
  EntityRepository,
  getRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { AdvertisementsEntity } from './advertisements.entity';
import { UserEntity } from '../user/user.entity';
import { CreateAdvertisementDto } from './dto/createAdvertisement.dto';
import {
  DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS,
  ORDER,
  MessageError,
} from '../constans/constans';
import { AdvertsResponseInterface } from './interface/advertResponseInterface';
import { createSlug } from '../helper/helper';
import {Filterobj, ModerationStatus} from './interface/interfacesAndTypes';
import { Optional } from '../interfacesAndTypes/optional.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Dictionary } from 'lodash';
import { QueryDto } from './dto/query.dto';

@EntityRepository(AdvertisementsEntity)
export class AdvertisementsRepository extends AbstractRepository<AdvertisementsEntity> {
  async createAdvertisement(
    currentUser: UserEntity,
    createAdvertDto: CreateAdvertisementDto,
  ): Promise<AdvertisementsEntity> {
    const advertisement: AdvertisementsEntity = new AdvertisementsEntity();

    Object.assign(advertisement, createAdvertDto);

    advertisement.slug = createSlug(createAdvertDto.title);
    advertisement.author = currentUser;

    return this.repository.save(advertisement);
  }

  async findBySlug(
    slug: string,
    filterObj?: Filterobj
  ): Promise<AdvertisementsEntity> {
    const filterOptions: Dictionary<any> = _.omitBy(
        filterObj,
      _.isNil,
    );

    const queryBuilder: SelectQueryBuilder<AdvertisementsEntity> =
      getRepository(AdvertisementsEntity)
        .createQueryBuilder(DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.TABLE)

        .leftJoinAndSelect(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.LEFT_JOIN_AND_SELECT,
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.USER,
        )

        .leftJoinAndSelect(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.LEFT_JOIN_AND_SELECT_USERBETS,
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.USERBETS,
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.USERBETS_IS_ACTIVE,
          { isActive: true },
        )

        .where(DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.ADVERT_SLUG, {
          slug: slug,
        });

    if (_.has(filterOptions, 'isActive')) {
      queryBuilder.andWhere(
        DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.ISACTIVE,
        { isActive: filterOptions.isActive },
      );
    }

    if (_.has(filterOptions, 'isModerated')) {
      queryBuilder.andWhere(
        DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.ISMODERATED,
        { isModerated: filterOptions.isModerated },
      );
    }

    const advertisement: Optional<AdvertisementsEntity> =
      await queryBuilder.getOne();

    if (!advertisement) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: [MessageError.ADVERTISEMENT_NOT_FOUND],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return advertisement;
  }

  async findAll(
    query: QueryDto,
    filterObj?: Filterobj
  ): Promise<AdvertsResponseInterface> {
    const filterOptions: Dictionary<any> = _.omitBy(
        filterObj,
      _.isNil,
    );

    const queryBuilder: SelectQueryBuilder<AdvertisementsEntity> =
      getRepository(AdvertisementsEntity)
        .createQueryBuilder(DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.TABLE)
        .leftJoinAndSelect(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.LEFT_JOIN_AND_SELECT,
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.USER,
        )

        .leftJoinAndSelect(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.LEFT_JOIN_AND_SELECT_USERBETS,
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.USERBETS,
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.USERBETS_IS_ACTIVE,
          { isActive: true },
        )

        .addOrderBy(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.SORT_COLUMN_BY_CREATE_AT,
          `${filterOptions.isModerated ? ORDER.DESC : ORDER.ASC}`,
        )
        .addOrderBy(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.SORT_BETS_BY_CREATE_AT,
          ORDER.DESC,
        );

    if (_.has(filterOptions, 'isActive')) {
      queryBuilder.andWhere(
        DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.ISACTIVE,
        { isActive: filterOptions.isActive },
      );
    }

    if (_.has(filterOptions, 'isModerated')) {
      queryBuilder.andWhere(
        DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.ISMODERATED,
        { isModerated: filterOptions.isModerated },
      );
    }

    if (_.has(filterOptions, 'authorId')) {
      queryBuilder.andWhere('advertisements.authorId = :authorId', {
        authorId: filterOptions.authorId,
      });
    }

    const advertisementCount: number = await queryBuilder.getCount(); //тотал по нашей таблице
    //create limit
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    //create offset
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const advertisements: AdvertisementsEntity[] = await queryBuilder.getMany();
    return { advertisements, advertisementCount };
  }

  async updateModeratedData(
    updateAdvertDto: AdvertisementsEntity,
  ): Promise<void> {
    await this.repository.update(
      {
        slug: updateAdvertDto.slug,
      },
      {
        isModerated: true,
        moderationStatus: updateAdvertDto.moderationStatus,
        moderationComment: updateAdvertDto.moderationComment,
        isActive:
          updateAdvertDto.moderationStatus === ModerationStatus.APPROVED
            ? true
            : false,
        expireAdvert:
          updateAdvertDto.moderationStatus === ModerationStatus.APPROVED
            ? moment().add(3, 'days').format()
            : null, //new Date(date.setDate(date.getDate()+3))
      },
    );
  }

  async updateAdData(updateAdvertDto: AdvertisementsEntity): Promise<void> {
    await this.repository.update(
      {
        slug: updateAdvertDto.slug,
      },
      {
        title: updateAdvertDto.title,
        country: updateAdvertDto.country,
        location: updateAdvertDto.location,
        category: updateAdvertDto.category,
        subCategory: updateAdvertDto.subCategory,
        price: updateAdvertDto.price,
        currency: updateAdvertDto.currency,
        img: updateAdvertDto.img,
        quantity: updateAdvertDto.quantity,
        unit: updateAdvertDto.unit,
        moderationStatus: ModerationStatus.UNMODERATED,
        isModerated: false,
      },
    );
  }
}
