import {forwardRef, Module} from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CronJobsRepository} from "./cron-jobs.repository";
import {BetModule} from "../bet/bet.module";
import {AdvertisementsModule} from "../advertisements/advertisements.module";
import {BetRepository} from "../bet/bet.repository";
import {AdvertisementsRepository} from "../advertisements/advertisements.repository";
import {CronBetRepository} from "./cronBet.repository";
import {CronAdvertisementRepository} from "./cron-advertisement-repository";

@Module({
  imports: [TypeOrmModule.forFeature([CronJobsRepository, CronBetRepository, CronAdvertisementRepository])],
  providers: [CronJobsService],
  exports: [CronJobsService]
})
export class CronJobsModule {}
