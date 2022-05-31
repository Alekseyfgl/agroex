import {AdvertisementsEntity} from "./advertisements.entity";
import { AdvertResponseInterfaceForCreate} from "./interface/advertResponseInterface";


export const advertisementForResponse = (advert: AdvertisementsEntity) : AdvertResponseInterfaceForCreate => ({
    advertisement: {
        status: 'success',
        id_advert: advert.id,
    },
})