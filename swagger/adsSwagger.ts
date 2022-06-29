import {AdvertisementsEntity} from "../src/advertisements/advertisements.entity";
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {CreateAdvertisementDto} from "../src/advertisements/dto/createAdvertisement.dto";
import {ModerationStatus} from "../src/advertisements/interface/interfacesAndTypes";

export class AdsSwagger extends OmitType(AdvertisementsEntity, ['userBets', 'author']) {}

export class GetAllAdsSwagger {
    @ApiProperty({type: AdvertisementsEntity, isArray: true})
    advertisements: AdvertisementsEntity
    @ApiProperty()
    advertisementCount: number
}

export class AdsWithoutBetsSwagger extends OmitType(AdvertisementsEntity, ["userBets"]) {}

export class GetOneAdSwagger {
    @ApiProperty({type: AdvertisementsEntity})
    advertisements: AdvertisementsEntity
}

export class CreateAdSwagger extends CreateAdvertisementDto {
    @ApiProperty()
    file: any;
}

export class CreateAdResponse {
    @ApiProperty({example: 'success'})
    status: string;
    @ApiProperty({example: 77})
    id_advertisement: number;
    @ApiProperty({example: 'tasty-apples--za6fiw'})
    slug: string;
}

export class CreateAdResponseSwagger {
    @ApiProperty()
    advertisement: CreateAdResponse
}

export class LastBetInfoSwagger {
    @ApiProperty({example: 214})
    user_id_with_last_bet: number
    @ApiProperty({example: '700'})
    last_bet_value: string
}

export class GetUsersAdsWithBetsSwagger extends AdsSwagger {
    @ApiProperty({example: 28})
    authorId: number
    @ApiProperty()
    lastBetInfo: LastBetInfoSwagger
}

export class ModeratorConfirmation {
    @ApiProperty({example: 'tasty-blackbarry-xki02q'})
    slug: string
    @ApiProperty({example: ModerationStatus.APPROVED})
    moderationStatus: string
    @ApiProperty({example: null})
    moderationComment: string
}

export class ModerConfirmRequestSwagger {
    @ApiProperty()
    advertisements: ModeratorConfirmation
}