import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";
import {Category} from "../interface/interfacesAndTypes";

export class UpdateAdDataDto {
  @ApiProperty()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 40)
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
  @IsNumber()
  @Min(0)
  @Max(10000000000)
  readonly price: number;

  @ApiProperty()
  @IsOptional()
  @Length(2, 3)
  readonly currency: string;

  img: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
  @IsNumber()
  @Min(0)
  @Max(10000000000)
  readonly quantity: number;

  @ApiProperty()
  @IsOptional()
  @Length(1, 5)
  readonly unit: string;
}
