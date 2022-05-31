import {IsNotEmpty, IsNumber, Length, Max, Min} from "class-validator";
import {Transform} from "class-transformer";

export class CreateAdvertisementDto {

    @Length(5, 200)
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
    @IsNumber()
    @Min(0)
    @Max(10000000000)
    readonly price: number;

    @Length(2, 3)
    readonly currency: string;


     img: string;


    @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
    @IsNumber()
    @Min(0)
    @Max(10000000000)
    readonly weight: number;

    @Length(1, 5)
    readonly unit: string;
}