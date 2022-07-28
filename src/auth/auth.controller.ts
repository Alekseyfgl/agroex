import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateCompanyDto, CreatePersonDto} from './dto/createUser.dto';
import { UserResponseInterface } from '../user/interfacesAndTypes/userResponse.interface';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/loginUserDto';
import { User } from '../user/decorators/user.decarator';
import { AuthGuard } from './guards/auth.guard';
import {ApiBody, ApiOAuth2, ApiOperation, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {CreateAdResponseSwagger, CreateAdSwagger} from "../../swagger/adsSwagger";
import {
  CompanyRegisterSwagger,
  LoginSwagger,
  PersonRegisterSwagger,
  Users,
  UsersSwagger
} from "../../swagger/usersSwagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileMimetypeFilter} from "../files/filters/file-mimetype-filter";
import {MAX_IMAGE_SIZE} from "../constans/constans";
import {ParseFile} from "../files/pipes/parse-file.pipe";
import {UploadApiResponse} from "cloudinary";
import {FilesService} from "../files/files.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly filesService: FilesService
  ) {}

  @ApiOperation({summary: 'Person registration'})
  @ApiResponse({status: 201, description: 'For user registration', type: UsersSwagger})
  @ApiBody({type: PersonRegisterSwagger})
  @Post('signup/person')
  @UsePipes(new ValidationPipe())
  async registerPerson(
    @Body('user') createUserDto: CreatePersonDto,
  ): Promise<UserResponseInterface> {
    // console.log('createUserDto', createUserDto); // {username: 'Masha',email: 'masha21@mail.com',password: '777',phone: '+375336429395'}
    const user: UserEntity = await this.authService.registerUser(createUserDto);
    return this.authService.buildUserResponseWithToken(user); // ответ для клиента после регистрации
  }

  @ApiOperation({summary: 'Company registration'})
  @ApiResponse({status: 201, description: 'For company registration', type: UsersSwagger})
  @ApiBody({type: CompanyRegisterSwagger})
  @Post('signup/company')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
      FileInterceptor('files', {
        fileFilter: fileMimetypeFilter('image', 'application'),
        limits: { fileSize: MAX_IMAGE_SIZE },
      }),
  )

  async registerCompany(
      @UploadedFile(ParseFile) file: Express.Multer.File,
      @Body() createUserDto: CreateCompanyDto,
  ): Promise<UserResponseInterface> {

    const imgSavedData: UploadApiResponse =
        await this.filesService.getSavedImgData(file);
    Object.assign(createUserDto, { certificateImage: imgSavedData.secure_url });

    const user: UserEntity = await this.authService.registerUser(createUserDto);
    return this.authService.buildUserResponseWithToken(user);
  }

  @ApiOperation({summary: 'User login'})
  @ApiResponse({status: 201, description: 'For user login', type: UsersSwagger})
  @ApiBody({type: LoginSwagger})
  @Post('login')
  @UsePipes(new ValidationPipe())

  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user: UserEntity = await this.authService.loginUser(loginUserDto);
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
