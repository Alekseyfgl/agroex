import {Controller, Get, Post, Param,  UseGuards} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {AuthGuard} from "../auth/guards/auth.guard";
import {User} from "../user/decorators/user.decarator";
import {ApprovedAdsResponseInterface} from "./interface/orders.interface";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }


    @Get()
    @UseGuards(AuthGuard)
    async findAll(@User('id') currentUserId: number): Promise<ApprovedAdsResponseInterface[]> {
        return await this.ordersService.getAllApprovedAds(currentUserId)
    }

    @Post(':slug')
    @UseGuards(AuthGuard)
    async confirmBet(@Param('slug') slug: string): Promise<void> {
        await this.ordersService.confirmBet(slug)
    }

}
