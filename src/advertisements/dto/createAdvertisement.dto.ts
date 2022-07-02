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
    example: 'Green apples',
    minLength: 3,
    maxLength: 40,
  })
  @Length(3, 40)
  readonly title: string;

  @ApiProperty({
    example: 'Uzbekistan',
    description: 'Uzbekistan'
  })
  @IsNotEmpty()
  country: string;


  @ApiProperty({
    description: 'Bukhara Region',
    example: 'Bukhara Region',
  })
  @IsNotEmpty()
  location: string;

  @ApiProperty({enum:Category, example: Category.FRUITS})
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @ApiProperty({
    example: '1000',
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
    example: 'USD',
    description: 'USD',
    minLength: 2,
    maxLength: 3
  })
  @Length(2, 3)
  readonly currency: string;

  img: string;

  @ApiProperty({
    example: '5000',
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
    example: 'kg',
    description: 'kg',
    maxLength:1,
    minLength: 5
  })
  @Length(1, 5)
  readonly unit: string;
}
