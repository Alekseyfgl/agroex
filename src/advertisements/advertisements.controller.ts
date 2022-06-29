import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { User } from '../user/decorators/user.decarator';
import { UserEntity } from '../user/user.entity';
import { CreateAdvertisementDto } from './dto/createAdvertisement.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdvertisementsEntity } from './advertisements.entity';
import {
  AdvertResponseInterface,
  AdvertResponseInterfaceForCreate,
  AdvertsResponseInterface,
  UserAdsWithBetsResponse,
} from './interface/advertResponseInterface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import { fileMimetypeFilter } from '../files/filters/file-mimetype-filter';
import { ParseFile } from '../files/pipes/parse-file.pipe';
import { UploadApiResponse } from 'cloudinary';
import {MAX_IMAGE_SIZE, ORDER, ROLES_ID} from '../constans/constans';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetModerationStatusDto } from './dto/setUpdatedAd.dto';
import { UpdateAdDataDto } from './dto/updateAdData.dto';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { QueryDto } from './dto/query.dto';
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {
  AdsWithoutBetsSwagger,
  CreateAdResponseSwagger,
  CreateAdSwagger,
  GetAllAdsSwagger,
  GetOneAdSwagger, GetUsersAdsWithBetsSwagger, ModerConfirmRequestSwagger
} from "../../swagger/adsSwagger";


@ApiTags('advertisements')
@Controller('advertisements')
export class AdvertisementsController {
  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly filesService: FilesService,
  ) {}

  @ApiOperation({summary: 'Create advertisement'})
  @ApiResponse({status: 201, description: 'Create advertisement for register user', type: CreateAdResponseSwagger})
  @ApiSecurity('JWT-auth')
 @ApiBody({type: CreateAdSwagger})
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('files', {
      fileFilter: fileMimetypeFilter('image'),
      limits: { fileSize: MAX_IMAGE_SIZE },
    }),
  )

  async createAdvertisement(
    @UploadedFile(ParseFile) file: Express.Multer.File, // получаем 1 файл, который нам отправляют
    @User() currentUser: UserEntity,
    @Body() createAdvertDto: CreateAdvertisementDto,
  ): Promise<AdvertResponseInterfaceForCreate> {
    const imgSavedData: UploadApiResponse =
      await this.filesService.getSavedImgData(file);
    Object.assign(createAdvertDto, { img: imgSavedData.secure_url });
    const advertisement: AdvertisementsEntity =
      await this.advertisementsService.createAdvertisement(
        currentUser,
        createAdvertDto,
      );

    return this.advertisementsService.buildAdvertisementResponseForCreate(
      advertisement,
    );
  }

  @ApiOperation({summary: 'Get one advertisement'})
  @ApiResponse({status: 200, description: 'Get one advertisement by slug', type: GetOneAdSwagger})
  @Get('slug/:slug')
  async getSingleAdvertisement(
    @Param('slug') slug: string,
  ): Promise<AdvertResponseInterface> {
    const advertisement: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug, {
        isActive: true,
      });
    return this.advertisementsService.buildAdvertisementResponseForGetOne(
      advertisement,
    );
  }

@ApiOperation({summary: 'Get all advertisements'})
@ApiResponse({
  status: 200,
  description: 'All advertisements that were checked by the moderator',
  type: GetAllAdsSwagger})
  @Get()
  @UsePipes(new ValidationPipe())
  async findAllActiveAdvertisements(
    @User('id') currentUserId: number,
    @Query() query: QueryDto,
  ): Promise<AdvertsResponseInterface> {
    return await this.advertisementsService.findAll(query, {
      isActive: true,
      order: ORDER.DESC
    });
  }


  @ApiOperation({summary: 'Get all user\'s advertisements'})
  @ApiResponse({status: 200, description: 'Get all user\'s advertisements in personal account', type: GetAllAdsSwagger})
  @ApiSecurity('JWT-auth')
  @Get('/my-advertisements') // для получения всех объявлений юзера для личного кабинета
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async findAllAdvertisements(
    @User('id') currentUserId: number,
    @Query() query: QueryDto,
  ): Promise<AdvertsResponseInterface> {
    return this.advertisementsService.findAll(query, {
      authorId: currentUserId,
      order: ORDER.DESC
    });
  }

  @ApiOperation({summary: 'Get all user\'s bets'})
  @ApiResponse({status: 200, description: 'Get all user\'s bets in personal account', type: GetUsersAdsWithBetsSwagger, isArray: true})
  @ApiSecurity('JWT-auth')
  @Get('/my-bets')
  @UseGuards(AuthGuard)
  async findAllAdsWithBetByAuthor(
    @User('id') currentUserId: number,
  ): Promise<UserAdsWithBetsResponse[]> {
    return this.advertisementsService.getAdsWithBetByAuthor(currentUserId);
  }

  @ApiOperation({summary: 'Get user\'s advertisement'})
  @ApiResponse({status: 200, description: 'Get user\'s advertisement by slug in personal account',type: GetOneAdSwagger})
  @ApiSecurity('JWT-auth')
  @Get('/my-advertisements/:slug') // для получения одного объявления юзера для личного кабинета (не смотрим на isActive)
  @UseGuards(AuthGuard)
  async getSingleMyAdvertisement(
    @Param('slug') slug: string,
  ): Promise<AdvertResponseInterface> {
    const advertisement: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug);
    return this.advertisementsService.buildAdvertisementResponseForGetOne(
      advertisement,
    );
  }

  @ApiOperation({summary: 'Editing advertisement by a moderator'})
  @ApiResponse({status: 200, description: 'Editing advertisement by a moderator'})
  @ApiSecurity('JWT-auth')
  @Put('/update')
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('files', {
      fileFilter: fileMimetypeFilter('image'),
      limits: { fileSize: MAX_IMAGE_SIZE },
    }),
  )
  async updateAdData(
    @UploadedFile() file: Express.Multer.File, // получаем 1 файл, который нам отправляют
    @User() currentUser: UserEntity,
    @Body() updateAdvertDto: UpdateAdDataDto,
  ): PromiseOptional<void> {
    if (file) {
      const imgSavedData: UploadApiResponse =
        await this.filesService.getSavedImgData(file);
      Object.assign(updateAdvertDto, { img: imgSavedData.secure_url });
    }

    return this.advertisementsService.setUpdatedAd(
      currentUser,
      updateAdvertDto,
    );
  }

  @ApiOperation({summary: 'Get all advertisements for moderation'})
  @ApiResponse({status: 200, description: 'Get all advertisements for moderation', type: AdsWithoutBetsSwagger})
  @ApiSecurity('JWT-auth')
  @Get('/moderation/get')
  @Roles(ROLES_ID.MODERATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  async findAllAdvertisementsForModeration(
    @User('id') currentUserId: number,
    @Query() query: QueryDto,
  ): Promise<AdvertsResponseInterface> {
    return this.advertisementsService.findAll(query, {
      isActive: false,
      isModerated: false,
      order: ORDER.ASC
    });
  }

  @ApiOperation({summary: 'Get all advertisements for moderation'})
  @ApiResponse({status: 200, description: 'Get all advertisements for moderation'})
  @ApiBody({type: ModerConfirmRequestSwagger})
  @ApiSecurity('JWT-auth')
  @Patch('/moderation/set')
  @Roles(ROLES_ID.MODERATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  async setAdvData(
    @Body('advertisements') updateAdvertDto: SetModerationStatusDto,
  ): Promise<void> {
    return this.advertisementsService.setModeratedData(updateAdvertDto);
  }

  @ApiOperation({summary: 'Get one advertisement for moderation'})
  @ApiResponse({status: 200, description: 'Get one advertisement for moderation', type: AdsWithoutBetsSwagger})
  @ApiSecurity('JWT-auth')
  @Get('/moderation/:slug')
  @Roles(ROLES_ID.MODERATOR)
  @UseGuards(AuthGuard, RolesGuard)
  async getSingleAdvertisementForModeration(
    @Param('slug') slug: string,
  ): Promise<AdvertResponseInterface> {
    const advertisement: AdvertisementsEntity =
      await this.advertisementsService.getAdvertisementBySlug(slug, {
        isActive: false,
        isModerated: false,
      });
    return this.advertisementsService.buildAdvertisementResponseForGetOne(
      advertisement,
    );
  }
}
