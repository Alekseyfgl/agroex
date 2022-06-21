import { AdvertisementsEntity } from './advertisements.entity';
import {
  AdvertResponseInterface,
  AdvertResponseInterfaceForCreate,
  AdvertsResponseInterface,
  UserAdsAndWithBets,
  UserAdsWithBetsResponse,
} from './interface/advertResponseInterface';

export const advertisementForResponse = (
  advert: AdvertisementsEntity,
): AdvertResponseInterfaceForCreate => ({
  advertisement: {
    status: 'success',
    id_advertisement: advert.id,
    slug: advert.slug,
  },
});

export const advertisementForGetBySlug = (
  advert: AdvertisementsEntity,
): AdvertResponseInterface => ({
  advertisement: {
    id: advert.id,
    title: advert.title,
    slug: advert.slug,
    category: advert.category,
    subCategory: advert.subCategory,
    country: advert.country,
    location: advert.location,
    isModerated: advert.isModerated,
    isActive: advert.isActive,
    moderationStatus: advert.moderationStatus,
    moderationComment: advert.moderationComment,
    price: advert.price,
    currency: advert.currency,
    img: advert.img,
    quantity: advert.quantity,
    unit: advert.unit,
    createAt: advert.createAt,
    updatedAt: advert.updatedAt,
    expireAdvert: advert.expireAdvert,
    author: {
      id: advert.author.id,
      email: advert.author.email,
      username: advert.author.username,
      phone: advert.author.phone,
      image: advert.author.image,
      banned: advert.author.banned,
      banReason: advert.author.banReason,
    },
    userBets: advert.userBets, // UserBets : [{id,user_id,advertisement_id, created_at,expireBet,betValue,isActive},{...}]
  },
});

export const advertisementsResponseAll = (
  advertAll: AdvertsResponseInterface,
): AdvertsResponseInterface => {
  advertAll.advertisements.forEach((advertisement) => {
    delete advertisement.author.password;
  });
  return advertAll;
};

export const userAdsWithActiveBets = (
  ads: UserAdsAndWithBets[],
): UserAdsWithBetsResponse[] => {
  return ads.map(
    (ad: UserAdsAndWithBets): UserAdsWithBetsResponse => ({
      id: ad.id,
      img: ad.img,
      createAt: ad.createAt,
      updatedAt: ad.updatedAt,
      authorId: ad.authorId,
      title: ad.title,
      price: ad.price,
      currency: ad.currency,
      quantity: ad.quantity,
      unit: ad.unit,
      slug: ad.slug,
      category: ad.category,
      subCategory: ad.subCategory,
      isModerated: ad.isModerated,
      country: ad.country,
      location: ad.location,
      moderationComment: ad.moderationComment,
      isActive: ad.isActive,
      expireAdvert: ad.expireAdvert,
      moderationStatus: ad.moderationStatus,
      isConfirmed: ad.isConfirmed,
      lastBetInfo: {
        user_id_with_last_bet: ad.user_id_with_last_bet,
        last_bet_value: ad.last_bet_value,
      },
    }),
  );
};
