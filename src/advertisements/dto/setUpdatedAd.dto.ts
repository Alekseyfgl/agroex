import { Allow, IsEnum, IsNotEmpty, NotEquals } from 'class-validator';
import { CreateAdvertisementDto } from './createAdvertisement.dto';
import { AdvertisementsEntity } from '../advertisements.entity';
import { ModerationStatus } from '../interface/interfacesAndTypes';

export class SetModerationStatusDto extends AdvertisementsEntity {
  @IsEnum(ModerationStatus)
  @NotEquals(ModerationStatus.UNMODERATED)
  moderationStatus: ModerationStatus;
}
