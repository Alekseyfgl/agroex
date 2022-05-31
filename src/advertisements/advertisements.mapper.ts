import {AdvertisementsEntity} from "./advertisements.entity";
import {AdvertResponseInterface} from "./interface/advertResponseInterface";


export const advertisementForResponse = (advert: AdvertisementsEntity) => ({
    advertisement: AdvertisementsEntity,
})