import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsLowercase,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;
}
