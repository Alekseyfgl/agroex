import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './interfacesAndTypes/userResponse.interface';
import { UserEntity } from '../user/user.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
  ) {
  }


  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    // console.log('createUserDto', createUserDto); // {username: 'Masha',email: 'masha21@mail.com',password: '777',phone: '+375336429395'}
    const user: UserEntity = await this.authService.registerUser(createUserDto);
    return this.authService.buildUserResponseWithToken(user); // ответ для клиента после регистрации
  }
}
