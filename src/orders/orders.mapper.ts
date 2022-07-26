import {
  ApprovedAdsResponseInterface,
  ConfirmedOrdersInterface,
} from './interface/orders.interface';

export const allApprovedAdsResponse = (
  ads: ConfirmedOrdersInterface[],
): ApprovedAdsResponseInterface[] => {
  return ads.map((ad) => {
    return {
      id: ad.id,
      title: ad.title,
      slug: ad.slug,
      category: ad.category,
      subCategory: ad.subCategory,
      country: ad.country,
      location: ad.location,
      isModerated: ad.isModerated,
      isActive: ad.isActiveAdv,
      isConfirmed: ad.isConfirmed,
      moderationComment: ad.moderationComment,
      price: ad.price,
      currency: ad.currency,
      img: ad.img,
      quantity: ad.quantity,
      unit: ad.unit,
      createAt: ad.createAt,
      updatedAt: ad.updatedAt,
      expireAdvert: ad.expireAdvert,
      author: {
        id: ad.author.id,
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
      orderInfo: {
        bet_id: ad.bet_id,
        totalPrice: ad.betValue,
        dealStatus: ad.dealStatus,
        orderCreated: ad.orderCreated,
      },
    };
  });
};
