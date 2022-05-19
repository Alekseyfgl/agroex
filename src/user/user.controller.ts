import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUserDto';
import { User } from './decorators/user.decarator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';


@Controller('users')
export class UserController {
  // используем service в нашем контроллере
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe()) // проверяет наш body и проверяет что мы передали в createUserDto
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    // console.log(createUserDto); // это поля из боди { username: 'foo', email: 'foo@gmail.com', password: '123' }

    const user = await this.userService.createUser(createUserDto); // здесь мы получаем пользователя
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  /*этот запрос только для залогиненых пользователей,т.к. токен обязательно должен быть прикреплен к запросу,
   если токен не прикреплен или не валиден мы должны выбросить ошибку 401
   но мы не хотим выбрасывать ошибки внутри middleware, т.к. мы зарегистрировали их глобально для абсолютно всех запросов
   и мы хотим точечно говорить на какие именно Router мы хотим выбрасывать ошибки
   -------здесь мы получаем текущего пользователя*/
  @Get() // здесь парсим наш токен и получаем текущего пользователя
  @UseGuards(AuthGuard) // проверяет залогинены мы или нет, то выбрас ошибку
  async currentUser(
    //получаем только id текущего пользователяч
    @User() user: UserEntity,
    @User('id') currentUserId: number,
  ): Promise<UserResponseInterface> {
    console.log('userId', currentUserId);
    console.log('UserEntity', user);

    return this.userService.buildUserResponse(user);
  }
}
