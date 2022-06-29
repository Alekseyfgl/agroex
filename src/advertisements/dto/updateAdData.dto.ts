import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';
import { CreateAdvertisementDto } from './createAdvertisement.dto';
import { Transform } from 'class-transformer';
import {Category} from "../interface/interfacesAndTypes";

export class UpdateAdDataDto {
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @Length(5, 40)
  readonly title: string;

  @IsOptional()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsEnum(Category)
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
  @IsNumber()
  @Min(0)
  @Max(10000000000)
  readonly price: number;

  @IsOptional()
  @Length(2, 3)
  readonly currency: string;

  img: string;

  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
  @IsNumber()
  @Min(0)
  @Max(10000000000)
  readonly quantity: number;

  @IsOptional()
  @Length(1, 5)
  readonly unit: string;
}
