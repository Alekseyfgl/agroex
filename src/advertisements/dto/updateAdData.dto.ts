import {IsNotEmpty} from "class-validator";
import {CreateAdvertisementDto} from "./createAdvertisement.dto";

export class UpdateAdDataDto extends CreateAdvertisementDto{

    @IsNotEmpty()
    slug: string;
}