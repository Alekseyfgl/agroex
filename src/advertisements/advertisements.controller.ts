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
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { MAX_IMAGE_SIZE, ROLES_ID } from '../constans/constans';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetModerationStatusDto } from './dto/setUpdatedAd.dto';
import { UpdateAdDataDto } from './dto/updateAdData.dto';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { QueryDto } from './dto/query.dto';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly filesService: FilesService,
  ) {}

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

  @Get()
  @UsePipes(new ValidationPipe())
  async findAllActiveAdvertisements(
    @User('id') currentUserId: number,
    @Query() query: QueryDto,
  ): Promise<AdvertsResponseInterface> {
    return await this.advertisementsService.findAll(query, {
      isActive: true,
      isModerated: true,
    });
  }

  @Get('/my-advertisements') // для получения всех объявлений юзера для личного кабинета (не смотрим на isActive)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async findAllAdvertisements(
    @User('id') currentUserId: number,
    @Query() query: QueryDto,
  ): Promise<AdvertsResponseInterface> {
    return this.advertisementsService.findAll(query, {
      authorId: currentUserId,
      isModerated: true,
    });
  }

  @Get('/my-bets')
  @UseGuards(AuthGuard)
  async findAllAdsWithBetByAuthor(
    @User('id') currentUserId: number,
  ): Promise<UserAdsWithBetsResponse[]> {
    return this.advertisementsService.getAdsWithBetByAuthor(currentUserId);
  }

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
    }); // возвращаем только рекламы не прошедшие модерацию (isModerated=false)
  }

  @Patch('/moderation/set')
  @Roles(ROLES_ID.MODERATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  async setAdvData(
    @Body('advertisements') updateAdvertDto: SetModerationStatusDto,
  ): Promise<void> {
    return this.advertisementsService.setModeratedData(updateAdvertDto);
  }

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
