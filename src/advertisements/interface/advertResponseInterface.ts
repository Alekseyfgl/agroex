import { AdvertisementsEntity } from '../advertisements.entity';
import { UserBetEntity } from '../../bets/user-bet.entity';
import { Optional } from '../../interfacesAndTypes/optional.interface';
import { ModerationStatus } from './interfacesAndTypes';
import { UserType } from '../../user/interfacesAndTypes/user.type';

export type AdvertisementType = {
  id: number;
  title: string;
  slug: string;
  authorId?: number;
  category: string;
  subCategory: Optional<string>;
  country: string;
  location: string;
  isModerated: boolean;
  isActive: boolean;
  isConfirmed?: boolean;
  moderationStatus: ModerationStatus;
  moderationComment: Optional<string>;
  price: number;
  currency: string;
  img: string;
  quantity: number;
  unit: string;
  createAt: Date;
  updatedAt: Date;
  expireAdvert: Date;
};

export interface AdvertResponseInterface {
  advertisement: AdvertisementType & { author: UserType } & {
    userBets: UserBetEntity[];
  };
}

export interface AdvertResponseInterfaceForCreate {
  advertisement: {
    status: string;
    id_advertisement: number;
    slug: string;
  };
}

export interface AdvertsResponseInterface {
  advertisements: AdvertisementsEntity[];
  advertisementCount: number;
}

export type LastBetInfoType = {
  user_id_with_last_bet: number;
  last_bet_value: string;
};

export type UserAdsAndWithBets = AdvertisementType & LastBetInfoType;

export type UserAdsWithBetsResponse = AdvertisementType & {
  lastBetInfo: LastBetInfoType;
};
