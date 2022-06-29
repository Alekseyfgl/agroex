import {
  AbstractRepository,
  EntityRepository,
  getRepository, In,
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
import {
  AdvertisementType,
  AdvertsResponseInterface,
  UserAdsAndWithBets,
} from './interface/advertResponseInterface';
import { createSlug } from '../helper/helper';
import {AdType, Filterobj, ModerationStatus} from './interface/interfacesAndTypes';
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
    filterObj?: Filterobj,
  ): Promise<AdvertisementsEntity> {
    const filterOptions: Dictionary<any> = _.omitBy(filterObj, _.isNil);

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
      throw new HttpException(MessageError.ADVERTISEMENT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return advertisement;
  }

  async findAdsWithBetByUser(
    currentUserId: number,
  ): Promise<UserAdsAndWithBets[]> {
    return this.repository.query(`SELECT DISTINCT adv.id, user_id_with_last_bet, last_bet_value, adv.*  FROM advertisements AS adv 
                                                        LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id
                                                        JOIN (SELECT adv.id, ub."betValue" AS last_bet_value, ub.user_id AS user_id_with_last_bet FROM advertisements AS adv 
                                                        LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id
                                                        WHERE ub."isActive"=true) AS activeAdv ON adv.id = activeAdv.id
                                                        WHERE ub.user_id = ${currentUserId} AND adv."isActive"=true
                                                        ORDER BY adv."updatedAt" DESC`);
  }

  async findAll(
    query: QueryDto,
    filterObj?: Filterobj,
  ): Promise<AdvertsResponseInterface> {
    const filterOptions: Dictionary<any> = _.omitBy(filterObj, _.isNil);
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
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.SORT_BETS_BY_CREATE_AT,
          ORDER.DESC,
        );

    if (_.has(filterOptions, 'order')) {
      queryBuilder.addOrderBy(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.SORT_COLUMN_BY_UPDATED_AT,
          filterOptions.order,
      );
    }

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

    if (query.category) {
      const currentCategory = query.category.split('-').join(' ');
      queryBuilder.andWhere(
        'LOWER(advertisements.category) =  LOWER(:category)',
        {
          category: `${currentCategory}`,
        },
      );
    }

    if (query.type === AdType.PENDING) {
      queryBuilder.andWhere(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.MODERATIONSTATUS,
          { moderationStatus: [ModerationStatus.REJECTED, ModerationStatus.UNMODERATED] },
      );
    }

    if (query.type === AdType.INACTIVE) {
      queryBuilder.andWhere(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.MODERATIONSTATUS,
          { moderationStatus: [ModerationStatus.APPROVED] },
      );
      queryBuilder.andWhere(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.ISACTIVE,
          { isActive: false },
      );
    }

    if (query.type === AdType.ACTIVE) {
      queryBuilder.andWhere(
          DB_RELATIONS_ADVERTISEMENTS_AND_USER_AND_BETS.ISACTIVE,
          { isActive: true },
      );
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
    const updateObj = _.omit(updateAdvertDto, ['slug']);
    updateObj.moderationStatus = ModerationStatus.UNMODERATED;
    updateObj.isModerated = false;
    await this.repository.update(
      {
        slug: updateAdvertDto.slug,
      },
      updateObj,
    );
  }
}
