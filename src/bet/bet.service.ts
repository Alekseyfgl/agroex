import {Body, Injectable, Param} from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {BetEntity} from "./entities/bet.entity";
import {Repository} from "typeorm";
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class BetService {
constructor(@InjectRepository(BetEntity) private readonly betRepository: Repository<BetEntity>) {
}


async foo(@Body() bet: CreateBetDto, @User() currentUser: UserEntity, @Param() slug) {
    console.log('slug', slug)
    console.log('dto', bet)
    console.log('currentUser', currentUser)
    return 'aaa' as any
}

}
