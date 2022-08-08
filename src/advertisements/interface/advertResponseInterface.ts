import { AdvertisementsEntity } from '../advertisements.entity';
import { UserBetEntity } from '../../bets/user-bet.entity';
import { Optional } from '../../interfacesAndTypes/optional.interface';
import { ModerationStatus } from './interfacesAndTypes';
import { User } from '../../user/interfacesAndTypes/user.type';
import {AdvertisementsImagesEntity} from "../advertisements-images.entity";

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
  images: AdvertisementsImagesEntity[];
  quantity: number;
  unit: string;
  createAt: Date;
  updatedAt: Date;
  expireAdvert: Date;
};

export interface AdvertResponseInterface {
  advertisement: AdvertisementType & { author: User } & {
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
  user_id: number;
  bet_value: number;
};

export type UserAdsAndWithBets = AdvertisementType & { userBets:  LastBetInfoType} & { author: User };

export type UserAdsWithBetsResponse = AdvertisementType & {
  lastBetInfo: Pick<UserBetEntity, 'user_id' | 'betValue'>;
} & { author: User };
