import {IsNotEmpty} from "class-validator";

export class CreateAdvertisementDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly currency: string;

    @IsNotEmpty()
    readonly img: string;

    @IsNotEmpty()
    readonly weight: number;

    @IsNotEmpty()
    readonly unit: string;
}