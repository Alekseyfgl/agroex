import {AdvertisementsEntity} from "./advertisements.entity";
import {AdvertResponseInterfaceForGetOne, AdvertResponseInterfaceForCreate} from "./interface/advertResponseInterfaceForGetOne";


export const advertisementForResponse = (advert: AdvertisementsEntity): AdvertResponseInterfaceForCreate => ({
    advertisement: {
        status: 'success',
        id_advertisement: advert.id,
        slug: advert.slug
    },
})

export const advertisementForGetBySlug = (advert: AdvertisementsEntity) : AdvertResponseInterfaceForGetOne => {

    delete advert.author.password
    return {advertisement: advert}

}