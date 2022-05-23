import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;
}
