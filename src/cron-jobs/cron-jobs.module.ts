import { Module } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronJobsRepository } from './cron-jobs.repository';
import { CronAdvertisementRepository } from './cron-advertisement-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CronJobsRepository, CronAdvertisementRepository]),
  ],
  providers: [CronJobsService],
  exports: [CronJobsService],
})
export class CronJobsModule {}
