import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class QueryDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber()
  authorId: number;

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
}
