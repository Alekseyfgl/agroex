import { Allow, IsEnum, IsNotEmpty, NotEquals } from 'class-validator';
import { CreateAdvertisementDto } from './createAdvertisement.dto';
import { AdvertisementsEntity } from '../advertisements.entity';
import { ModerationStatus } from '../interface/interfacesAndTypes';
import {ApiProperty} from "@nestjs/swagger";

export class SetModerationStatusDto extends AdvertisementsEntity {

  @IsNotEmpty()
  slug: string;

  @IsEnum(ModerationStatus)
  @NotEquals(ModerationStatus.UNMODERATED)
  moderationStatus: ModerationStatus;
}
