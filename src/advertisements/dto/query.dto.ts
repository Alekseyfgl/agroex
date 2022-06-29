import {IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import { Transform } from 'class-transformer';
import {AdType} from "../interface/interfacesAndTypes";

export class QueryDto {
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  authorId: number;

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  limit: number;

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  offset: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsEnum(AdType)
  type: AdType
}
