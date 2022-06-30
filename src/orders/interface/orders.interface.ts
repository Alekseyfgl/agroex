import { Optional } from '../../interfacesAndTypes/optional.interface';
import { OrdersEntity } from '../entities/orders.entity';
import { UserEntity } from '../../user/user.entity';
import { AdvertisementsEntity } from '../../advertisements/advertisements.entity';
import { UserBetEntity } from '../../bets/user-bet.entity';

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
  price: string;
  currency: string;
  img: Optional<string>;
  quantity: string;
  unit: string;
  createAt: Date;
  updatedAt: Date;
  expireAdvert: Date;
  author: {
    id: number;
    email: string;
    username: string;
    phone: string;
    image: Optional<string>;
    banned: boolean;
    banReason: Optional<string>;
  };
  orderInfo: {
    orderCreated: Date;
    totalPrice: string;
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
