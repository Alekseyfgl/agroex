import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/createBet.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decarator';
import { UserEntity } from '../user/user.entity';
import { UserBetEntity } from './user-bet.entity';
import {ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {GetAllAdsSwagger} from "../../swagger/adsSwagger";

@ApiTags('bets')
@Controller()
export class BetController {
  constructor(private readonly betService: BetService) {}

  @ApiOperation({summary: 'Set bet as register user'})
@ApiBody({type: CreateBetDto})
  @ApiSecurity('JWT-auth')
  @Post(':slug/bet')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createBet(
    @Body() createBetDto: CreateBetDto,
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
  ): Promise<void> {
    await this.betService.createBet(createBetDto, currentUser, slug);
  }
}
