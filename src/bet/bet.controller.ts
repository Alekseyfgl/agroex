import {Controller, Post, Body, Param, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {BetService} from './bet.service';
import {CreateBetDto} from './dto/createBet.dto';
import {AuthGuard} from "../auth/guards/auth.guard";
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
import {UserBetEntity} from "./user-bet.entity";

@Controller()

export class BetController {
    constructor(private readonly betService: BetService) {
    }

    @Post(':slug/bet')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createBet(@Body() createBetDto: CreateBetDto, @User() currentUser: UserEntity,@Param() slug: string): Promise<UserBetEntity> {
        return this.betService.createBet(createBetDto, currentUser, slug)
    }
}
