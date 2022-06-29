import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'Dima'})
  @IsNotEmpty()
  readonly username: string;

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
