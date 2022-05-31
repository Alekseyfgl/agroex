import {AdvertisementsEntity} from "../advertisements.entity";

// export interface AdvertResponseInterface {
//     advertisement: AdvertisementsEntity
// }

export interface AdvertResponseInterfaceForCreate {
    advertisement: {
        status: string,
        id_advert: number
    }
}
