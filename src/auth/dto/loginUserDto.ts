import { IsEmail, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({example:'anton@gmail.com'})
  @IsEmail()
  readonly email: string;

  @ApiProperty({example:'1234567'})
  @IsNotEmpty()
  readonly password: string;
}
