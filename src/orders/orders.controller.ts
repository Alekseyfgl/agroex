import {Controller, Get, Post, Param, UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decarator';
import { ApprovedAdsResponseInterface } from './interface/orders.interface';
import { UserEntity } from '../user/user.entity';
import {ApiOperation, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {GetAllAdsSwagger} from "../../swagger/adsSwagger";
import {OrdersSwagger} from "../../swagger/ordersSwagger";


@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({summary: 'Get all confirmed advertisements'})
  @ApiSecurity('JWT-auth')
  @ApiResponse({
    status: 200,
    type: OrdersSwagger})
  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @User('id') currentUserId: number,
  ): Promise<ApprovedAdsResponseInterface[]> {
    return await this.ordersService.getAllApprovedAds(currentUserId);
  }

  @ApiOperation({summary: 'Confirm the deal'})
  @ApiSecurity('JWT-auth')
  @Post('confirm/:slug')
  @UseGuards(AuthGuard)
  async confirmBet(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
  ): Promise<void> {
    await this.ordersService.confirmBet(currentUser, slug);
  }

  @ApiOperation({summary: 'Buy product now'})
  @ApiSecurity('JWT-auth')
  @Post('buy/:slug')
  @UseGuards(AuthGuard)
  async buyNow(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
  ): Promise<void> {
    await this.ordersService.buyNow(currentUser, slug);
  }
}
