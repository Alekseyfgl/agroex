import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './interfacesAndTypes/userResponse.interface';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/loginUserDto';
import { User } from '../user/decorators/user.decarator';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user: UserEntity = await this.authService.registerUser(createUserDto);
    return this.authService.buildUserResponseWithToken(user); // ответ для клиента после регистрации
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user: CreateUserDto = await this.authService.loginUser(loginUserDto);
    return this.authService.buildUserResponseWithToken(user); // ответ для клиента после авторизации
  }

  @Get('user')
  @UseGuards(AuthGuard) // проверяем регистрац
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    // здесь всегда получим пользоватля, т.к. могут заходить только зарегестрированные
    return this.authService.buildUserResponseWithToken(user);
  }
}
