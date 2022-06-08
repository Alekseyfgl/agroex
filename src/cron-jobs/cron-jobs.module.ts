import {forwardRef, Module} from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CronJobsRepository} from "./cron-jobs.repository";
import {BetModule} from "../bet/bet.module";

@Module({
  imports: [TypeOrmModule.forFeature([CronJobsRepository]),
    forwardRef(()=>BetModule)],
  providers: [CronJobsService],
  exports: [CronJobsModule, CronJobsService]
})
export class CronJobsModule {}
