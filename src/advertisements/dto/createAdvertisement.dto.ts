import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Category } from '../interface/interfacesAndTypes';
import {ApiProperty} from "@nestjs/swagger";

export class CreateAdvertisementDto {

  @ApiProperty({
    description: 'Green apples',
    minLength: 5,
    maxLength: 40,
  })
  @Length(5, 40)
  readonly title: string;

  @ApiProperty({
    description: 'Uzbekistan'
  })
  @IsNotEmpty()
  country: string;


  @ApiProperty({
    description: 'Bukhara Region'
  })
  @IsNotEmpty()
  location: string;

  @ApiProperty({enum:Category})
  @IsNotEmpty()
  @IsEnum(Category)
  category: string;

  @ApiProperty({
    description: '1000',
    minimum: 2,
    maximum:10000000000,
  })
  @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
  @IsInt()
  @Min(2)
  @Max(10000000000)
  readonly price: number;

  @ApiProperty({
    description: 'USD',
    minLength: 2,
    maxLength: 3
  })
  @Length(2, 3)
  readonly currency: string;

  @ApiProperty({
    description: 'https://res.cloudinary.com/agroex-backend/image/upload/v1656319451/an1itowgp0ihudazw5js.webp'
  })
  img: string;

  @ApiProperty({
    description: '5000',
    minimum: 2,
    maximum:10000000000,
  })
  @Transform(({ value }) => Number(value), { toClassOnly: true }) //преобразует в number
  @IsNumber()
  @Min(0)
  @Max(10000000000)
  readonly quantity: number;

  @ApiProperty({
    description: 'kg',
    maxLength:1,
    minLength: 5
  })
  @Length(1, 5)
  readonly unit: string;
}
