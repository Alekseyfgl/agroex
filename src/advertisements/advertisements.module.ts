import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsRepository } from './advertisements.repository';
import { FilesModule } from '../files/files.module';
import { CronJobsModule } from '../cron-jobs/cron-jobs.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdvertisementsRepository]),
    FilesModule,
    CronJobsModule,
    NotificationsModule,
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
  exports: [AdvertisementsService],
})
export class AdvertisementsModule {}
