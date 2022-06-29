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
import { UserResponseInterface } from '../user/interfacesAndTypes/userResponse.interface';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/loginUserDto';
import { User } from '../user/decorators/user.decarator';
import { AuthGuard } from './guards/auth.guard';
import {ApiBody, ApiOAuth2, ApiOperation, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {CreateAdResponseSwagger, CreateAdSwagger} from "../../swagger/adsSwagger";
import {LoginSwagger, RegisterSwagger, Users, UsersSwagger} from "../../swagger/usersSwagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'User registration'})
  @ApiResponse({status: 201, description: 'For user registration', type: UsersSwagger})
  @ApiBody({type: RegisterSwagger})
  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    // console.log('createUserDto', createUserDto); // {username: 'Masha',email: 'masha21@mail.com',password: '777',phone: '+375336429395'}
    const user: UserEntity = await this.authService.registerUser(createUserDto);
    return this.authService.buildUserResponseWithToken(user); // ответ для клиента после регистрации
  }

  @ApiOperation({summary: 'User login'})
  @ApiResponse({status: 201, description: 'For user login', type: UsersSwagger})
  @ApiBody({type: LoginSwagger})
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user: CreateUserDto = await this.authService.loginUser(loginUserDto);
    return this.authService.buildUserResponseWithToken(user); // ответ для клиента после авторизации
  }

  @ApiOperation({summary: 'Get current  user'})
  @ApiResponse({status: 200, description: 'Get current user by token', type: Users})
  @ApiSecurity('JWT-auth')
  @ApiOAuth2(['pets:write'])
  @Get('user')
  @UseGuards(AuthGuard) // проверяем регистрац
  async currentUser(
    @User() user: UserEntity,
    @User('id') currentUserId: number,
  ): Promise<UserResponseInterface> {
    return this.authService.buildUserResponseWithToken(user);
  }
}
