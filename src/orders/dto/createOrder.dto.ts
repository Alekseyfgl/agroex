import {Transform} from "class-transformer";
import {IsNumber} from "class-validator";


// export class CreateOrderDto {
//     @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
//     @IsNumber()
//     acceptPrice: number
// }