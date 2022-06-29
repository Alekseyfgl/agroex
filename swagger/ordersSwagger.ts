import {AdsWithoutBetsSwagger} from "./adsSwagger";
import {ApiProperty} from "@nestjs/swagger";
import {LoginUserDto} from "../src/auth/dto/loginUserDto";

export class OrderInfo {
    @ApiProperty({example: 1})
    bet_id: number
    @ApiProperty({example: 499})
    totalPrice: string
    @ApiProperty({example: 'confirmed'})
    dealStatus: string
    @ApiProperty()
    orderCreated: Date
}

export class OrdersSwagger extends AdsWithoutBetsSwagger {
    @ApiProperty()
    orderInfo: OrderInfo
}

