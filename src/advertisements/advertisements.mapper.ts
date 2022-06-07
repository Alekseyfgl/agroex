import {AdvertisementsEntity} from "./advertisements.entity";
import {
    AdvertResponseInterface,
    AdvertResponseInterfaceForCreate,
    AdvertsResponseInterface
} from "./interface/advertResponseInterface";


export const advertisementForResponse = (advert: AdvertisementsEntity): AdvertResponseInterfaceForCreate => ({
    advertisement: {
        status: 'success',
        id_advertisement: advert.id,
        slug: advert.slug
    },
})


export const advertisementForGetBySlug = (advert: AdvertisementsEntity): AdvertResponseInterface => ({
    advertisement: {
        id: advert.id,
        title: advert.title,
        slug: advert.slug,
        category: advert.category,
        subCategory: advert.subCategory,
        country: advert.country,
        location: advert.location,
        isModerated: advert.isModerated,
        price: advert.price,
        currency: advert.currency,
        img: advert.img,
        quantity: advert.quantity,
        unit: advert.unit,
        createAt: advert.createAt,
        updatedAt: advert.updatedAt,
        author: {
            id: advert.author.id,
            email: advert.author.email,
            username: advert.author.username,
            phone: advert.author.phone,
            image: advert.author.image,
            banned: advert.author.banned,
            banReason: advert.author.banReason
        }
    }
})

export const advertisementsResponseAll = (advertAll: AdvertsResponseInterface): AdvertsResponseInterface => {
    advertAll.advertisements.forEach(advertisement => delete advertisement.author.password)

    // const arrAdvert = advertAll.advertisements
    // for (let i = 0; i < arrAdvert.length; i++) {
    //     const userBets = arrAdvert[i].userBets;
    //
    //     if (userBets.length > 0) {
    //         for (let i = 0; i < userBets.length; i++) {
    //             // console.log(userBets[i].isActive)
    //             if(!userBets[i].isActive) {
    //                 console.log('-----userBets-----',userBets.length )
    //                 delete userBets[i]
    //             }
    //
    //         }
    //     }
    // }
    return advertAll
}