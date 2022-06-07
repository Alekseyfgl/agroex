import {IsNumber, Max, Min} from "class-validator";
import {Transform} from "class-transformer";


export class CreateBetDto {
    @Transform(({value}) => Number(value), {toClassOnly: true}) //преобразует в number
    @IsNumber()
    @Min(0)
    @Max(10000000000)
    betValue: number
}
