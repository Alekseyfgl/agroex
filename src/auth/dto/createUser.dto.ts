import {IsEmail, IsEnum, IsNotEmpty, Length} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import { userType } from '../../user/interfacesAndTypes/user.type';

export class CreatePersonDto {
  @ApiProperty({example: userType})
  @IsEnum(userType)
  type: userType.PERSON

  @ApiProperty({example: 'Dima'})
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({example: 'Ivanov'})
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty({example: 'Dima@gmail.com'})
  @IsEmail()
  readonly email: string;

  @ApiProperty({example: '+375334567899'})
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({minLength: 5, maxLength: 30, example: '123456'})
  @Length(5, 30)
  readonly password: string;
}

export class CreateCompanyDto {

  @ApiProperty({example: userType})
  @IsEnum(userType)
  type: userType.LEGALENTITY

  @ApiProperty({example: 'Dima'})
  @IsNotEmpty()
  readonly companyName: string;

  @ApiProperty({example: 'Ivanov'})
  @IsNotEmpty()
  readonly companyTaxNumber: string;

  @ApiProperty({example: 'Ivanov'})
  @IsNotEmpty()
  readonly bankAccount: string;

  readonly certificateImage: string;

  @ApiProperty({example: 'Dima@gmail.com'})
  @IsEmail()
  readonly email: string;

  @ApiProperty({example: '+375334567899'})
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({minLength: 5, maxLength: 30, example: '123456'})
  @Length(5, 30)
  readonly password: string;
}

//   id: number;
//   type: userType
//   email: string;
//   name: string;
//   surname: string;
//   phone: string;
//   image: Optional<string>;
//   companyName: string;
//   companyTaxNumber: string;
//   bankAccount: string;
//   certificateImage: string;
//   banned: boolean;
//   banReason: Optional<string>;
