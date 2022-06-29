import { IsInt, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateBetDto {
  @ApiProperty({example: 355})
  @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
  @IsInt()
  @Min(1)
  @Max(10000000000)
  betValue: number;
}
