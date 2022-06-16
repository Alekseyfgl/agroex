import { Optional } from '../../interfacesAndTypes/optional.interface';

export interface ConfirmedOrdersInterface {
  id: number;
  img: Optional<string>;
  createAt: Date;
  updatedAt: Date;
  authorId: number;
  title: string;
  price: string;
  currency: string;
  quantity: string;
  unit: string;
  slug: string;
  category: string;
  subCategory: Optional<string>;
  isModerated: boolean;
  country: string;
  location: string;
  moderationComment: Optional<string>;
  isActiveAdv: boolean;
  expireAdvert: Date;
  isConfirmed: boolean;
  email: string;
  username: string;
  phone: string;
  password: string;
  image: Optional<string>;
  banned: boolean;
  banReason: Optional<string>;
  user_id: number;
  created_at: Date;
  expireBet: Date;
  betValue: string;
  advertisement_id: number;
  order_bet_id: number;
  dealStatus: string;
  bet_id: number;
  orderCreated: Date;
}

export interface ApprovedAdsResponseInterface {
  id: number;
  title: string;
  slug: string;
  category: string;
  subCategory: Optional<string>;
  country: string;
  location: string;
  isModerated: boolean;
  isActive: boolean;
  // isActiveAdv: boolean;
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
}

export enum DEAL_STATUS {
  CONFIRMED = 'confirmed',
  UNCONFIRMED = 'unconfirmed',
}
