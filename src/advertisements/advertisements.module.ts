import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsRepository } from './advertisements.repository';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementsRepository]), FilesModule],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
  exports: [AdvertisementsModule, AdvertisementsService],
})
export class AdvertisementsModule {}
