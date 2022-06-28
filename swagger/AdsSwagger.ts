import {AdvertisementsEntity} from "../src/advertisements/advertisements.entity";
import {ApiProperty} from "@nestjs/swagger";
import {CreateAdvertisementDto} from "../src/advertisements/dto/createAdvertisement.dto";
import {Category} from "../src/advertisements/interface/interfacesAndTypes";




export class GetAllAdsSwagger {
    @ApiProperty({type: AdvertisementsEntity, isArray: true})
    advertisements: AdvertisementsEntity
    @ApiProperty()
    advertisementCount: number
}

// export class CreateAdSwagger  extends CreateAdvertisementDto {
//     @ApiProperty()
//     title: 'Banana'
//     // country: 'Uzbekistan'
//     // location: 'Bukhara Region'
//     // Category: Category
// }