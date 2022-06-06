import {Controller, Post, Body, Param, UseGuards} from '@nestjs/common';
import {BetService} from './bet.service';
import {CreateBetDto} from './dto/createBet.dto';
import {AuthGuard} from "../auth/guards/auth.guard";
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";

@Controller()
export class BetController {
    constructor(private readonly betService: BetService) {
    }

    @Post(':slug/bet')
    @UseGuards(AuthGuard)
    async createBet(@Body() createBetDto: CreateBetDto, @User() currentUser: UserEntity,@Param() slug: string) {
        return this.betService.createBet(createBetDto, currentUser, slug)
    }
}
