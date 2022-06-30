import { DeviceTypes } from '../interfacesAndTypes/interfacesAndTypes';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateTokenDto {
  @ApiProperty({example: 'web || iOS || android'})
  @IsNotEmpty()
  @IsEnum(DeviceTypes)
  deviceType: DeviceTypes;

  @ApiProperty({ example: 'dNvBNZJsa6lZTE_S10dDNo:APA91bFW3JNGniAH3LxL0BfFPt_MFQKgQZT8T6TJLUCbND0'})
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({example: 'true'})
  @Transform(({ value }) => Boolean(value), { toClassOnly: true })
  @IsNotEmpty()
  isAllowed: boolean;
}
