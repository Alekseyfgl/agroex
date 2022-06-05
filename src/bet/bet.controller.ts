import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {BetService} from './bet.service';
import {CreateBetDto} from './dto/create-bet.dto';
import {UpdateBetDto} from './dto/update-bet.dto';
import {AuthGuard} from "../auth/guards/auth.guard";
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";

@Controller()
export class BetController {
    constructor(private readonly betService: BetService) {
    }

    @Post(':id/bet')
    @UseGuards(AuthGuard)
    async createBet(@Body() bet: CreateBetDto, @User() currentUser: UserEntity, @Param() slug) {
            return this.betService.foo(bet, currentUser, slug)
    }

}
