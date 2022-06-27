import { DeviceTypes } from '../interfacesAndTypes/interfacesAndTypes';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTokenDto {
  @IsNotEmpty()
  @IsEnum(DeviceTypes)
  deviceType: DeviceTypes;

  @IsString()
  @IsNotEmpty()
  token: string;

  @Transform(({ value }) => Boolean(value), { toClassOnly: true })
  @IsNotEmpty()
  isAllowed: boolean;
}
