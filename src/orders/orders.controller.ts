import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {AuthGuard} from "../auth/guards/auth.guard";
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
// import {CreateOrderDto} from "./dto/createOrder.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }


    @Get()
    @UseGuards(AuthGuard)
    async findAll(@User('id') currentUserId: number) {
        return await this.ordersService.getAllApprovedAds(currentUserId)
    }

    @Post(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async acceptBet(
        @User() currentUser: UserEntity,
        @Param('slug') slug: string,
    ) {
        await this.ordersService.acceptBet(currentUser, slug)
    }

}
