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
      uuid: advert.author.uuid,
      type: advert.author.type,
      email: advert.author.email,
      name: advert.author.name,
      surname: advert.author.surname,
      companyName: advert.author.companyName,
      companyTaxNumber: advert.author.companyTaxNumber,
      certificateImage: advert.author.certificateImage,
      bankAccount: advert.author.bankAccount,
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
  ads,
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
      author: {
        id: ad.author.id,
        uuid: ad.author.uuid,
        type: ad.author.type,
        email: ad.author.email,
        name: ad.author.name,
        surname: ad.author.surname,
        companyName: ad.author.companyName,
        companyTaxNumber: ad.author.companyTaxNumber,
        certificateImage: ad.author.certificateImage,
        bankAccount: ad.author.bankAccount,
        phone: ad.author.phone,
        image: ad.author.image,
        banned: ad.author.banned,
        banReason: ad.author.banReason,
      },
      lastBetInfo: {
        user_id: ad.userBets[0].user_id,
        betValue: ad.userBets[0].betValue,
      },
    }),
  );
};
