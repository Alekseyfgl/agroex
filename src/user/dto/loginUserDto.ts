import { IsEmail, IsNotEmpty, IsLowercase } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
