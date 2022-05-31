import {IsNotEmpty, IsNumber, Length, Max, Min} from "class-validator";

export class CreateAdvertisementDto {

    @Length(5, 200)
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @Min(0)
    @Max(10000000000)
    readonly price: number;

    @Length(2, 3)
    readonly currency: string;

    @IsNotEmpty()
    readonly img: string;

    @IsNumber()
    @Min(0)
    @Max(10000000000)
    readonly weight: number;

    @Length(1, 5)
    readonly unit: string;
}