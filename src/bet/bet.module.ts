import {forwardRef, Module} from '@nestjs/common';
import {BetService} from './bet.service';
import {BetController} from './bet.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";
import {UserBetEntity} from "./user-bet.entity";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {BetRepository} from "./bet.repository";
import {AdvertisementsModule} from "../advertisements/advertisements.module";
import {UserModule} from "../user/user.module";
import {CronJobsModule} from "../cron-jobs/cron-jobs.module";

@Module({
    imports: [TypeOrmModule.forFeature([ UserEntity, UserBetEntity, AdvertisementsEntity, BetRepository]), AdvertisementsModule, UserModule,
        forwardRef(()=>CronJobsModule)],
    controllers: [BetController],
    providers: [BetService],
    exports: [BetService]
})
export class BetModule {
}
