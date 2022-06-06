import {Body, Injectable, Param} from '@nestjs/common';
import { CreateBetDto } from './dto/createBet.dto';
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
import {BetRepository} from "./bet.repository";

@Injectable()
export class BetService {
constructor(private readonly betRepository: BetRepository) {
}


async createBet(@Body() bet: CreateBetDto, @User() currentUser: UserEntity, @Param() slug) {
    console.log('slug', slug)
    console.log('dto', bet)
    console.log('currentUser', currentUser)
    return this.betRepository.createBet()
}

}
