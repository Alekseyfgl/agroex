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

export const advertisementForGetBySlug = (advert: AdvertisementsEntity): AdvertResponseInterface => {
    delete advert.author.password
    return {advertisement: advert}
}

export const advertisementsResponseAll = (advertAll: AdvertsResponseInterface): AdvertsResponseInterface => {
    advertAll.advertisements.forEach(advertisement => delete advertisement.author.password)
    return advertAll
}