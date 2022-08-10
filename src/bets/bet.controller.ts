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
import {ApiBody, ApiOperation, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {ApprovedUserGuard} from "../user/guards/approvedUser.guard";

@ApiTags('bets')
@Controller()
export class BetController {
  constructor(private readonly betService: BetService) {}

  @ApiOperation({summary: 'Set bet as register user'})
  @ApiBody({type: CreateBetDto})
  @ApiSecurity('JWT-auth')
  @Post(':slug/bet')
  @UseGuards(AuthGuard, ApprovedUserGuard)
  @UsePipes(new ValidationPipe())
  async createBet(
    @Body() createBetDto: CreateBetDto,
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
  ): Promise<void> {
    await this.betService.createBet(createBetDto, currentUser, slug);
  }
}
