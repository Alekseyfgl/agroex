import {IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AdType} from "../interface/interfacesAndTypes";

export class QueryDto {

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  offset: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsEnum(AdType)
  type: AdType
}
