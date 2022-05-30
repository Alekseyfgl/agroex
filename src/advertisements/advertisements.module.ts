import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdvertisementsRepository} from "./advertisements.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementsRepository])],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService]
})
export class AdvertisementsModule {}
