import { Optional } from '../../interfacesAndTypes/optional.interface';
import { OrdersEntity } from '../entities/orders.entity';
import { UserEntity } from '../../user/user.entity';
import { AdvertisementsEntity } from '../../advertisements/advertisements.entity';
import { UserBetEntity } from '../../bets/user-bet.entity';
import {userType} from "../../user/interfacesAndTypes/user.type";
import {AdvertisementsImagesEntity} from "../../advertisements/advertisements-images.entity";

export type OrdersType = OrdersEntity & { bet_id: number };

export type ConfirmedOrdersInterface = UserEntity &
  OrdersType &
  UserBetEntity &
  AdvertisementsEntity & {
    authorId: number;
    price: string;
    quantity: string;
    isActiveAdv: boolean;
    betValue: string;
  };

export type ApprovedAdsResponseInterface = {
  id: number;
  title: string;
  slug: string;
  category: string;
  subCategory: Optional<string>;
  country: string;
  location: string;
  isModerated: boolean;
  isActive: boolean;
  moderationComment: Optional<string>;
  price: number;
  currency: string;
  img: AdvertisementsImagesEntity[];
  quantity: number;
  unit: string;
  createAt: Date;
  updatedAt: Date;
  expireAdvert: Date;
  author: {
    id: number;
    type: userType;
    email: string;
    name: string;
    surname: string;
    phone: string;
    image: Optional<string>;
    companyName: string;
    companyTaxNumber: string;
    bankAccount: string;
    certificateImage: string;
    banned: boolean;
    banReason: Optional<string>;
  };
  orderInfo: {
    orderCreated: Date;
    totalPrice: number;
    bet_id: number;
    dealStatus: string;
  };
};

export enum DEAL_STATUS {
  CONFIRMED = 'confirmed',
  UNCONFIRMED = 'unconfirmed',
}

export type BetType = {
  isMaxBet?: boolean;
  betValue: number;
};

export type UserIdInBetsType = {
  user_id: number;
};
