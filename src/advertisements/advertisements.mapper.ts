import {AdvertisementsEntity} from "./advertisements.entity";
import {AdvertResponseInterface, AdvertResponseInterfaceForCreate} from "./interface/advertResponseInterface";


export const advertisementForResponse = (advert: AdvertisementsEntity): AdvertResponseInterfaceForCreate => ({
    advertisement: {
        status: 'success',
        id_advertisement: advert.id,
        slug: advert.slug
    },
})

export const advertisementForGetBySlug = (advert: AdvertisementsEntity) : AdvertResponseInterface => {

    delete advert.author.password
    return {advertisement: advert}

}