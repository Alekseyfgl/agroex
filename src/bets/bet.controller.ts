import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe, Sse, Get,Request
} from '@nestjs/common';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/createBet.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decarator';
import { UserEntity } from '../user/user.entity';
import { UserBetEntity } from './user-bet.entity';
import {interval, Observable} from "rxjs";
import internal from "stream";
import {map} from "rxjs/operators";
import {OnEvent} from "@nestjs/event-emitter";


interface MessageEvent {
  data: string| object
}

@Controller()
export class BetController {
  constructor(private readonly betService: BetService,
             ) {}

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

  @Sse('event')
  events(@Request() req,) {
    return this.betService.subscribe();
  }

  @Post('emit')
  async emit() {
    await this.betService.emit({emitting: new Date().toISOString()});
    return {ok: true};
  }
}
