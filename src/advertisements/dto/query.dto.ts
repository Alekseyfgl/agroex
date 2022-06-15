import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

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
}
