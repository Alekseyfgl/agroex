import {Module} from '@nestjs/common';
import {BetService} from './bet.service';
import {BetController} from './bet.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BetEntity} from "./entities/bet.entity";
import {UserEntity} from "../user/user.entity";
import {UserBetEntity} from "./user-bet.entity";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {BetRepository} from "./bet.repository";

@Module({
    imports: [TypeOrmModule.forFeature([BetEntity, UserEntity, UserBetEntity, AdvertisementsEntity, BetRepository])],
    controllers: [BetController],
    providers: [BetService],
    exports: [BetService]
})
export class BetModule {
}
