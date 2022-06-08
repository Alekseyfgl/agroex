import {
    Body,
    Controller,
    Get, HttpStatus,
    Param,
    Post, Put, Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {AdvertisementsService} from './advertisements.service';
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {AdvertisementsEntity} from "./advertisements.entity";
import {
    AdvertResponseInterface,
    AdvertResponseInterfaceForCreate, AdvertsResponseInterface, QueryInterface,
} from "./interface/advertResponseInterface";
import {FileInterceptor} from "@nestjs/platform-express";
import {FilesService} from "../files/files.service";
import {fileMimetypeFilter} from "../files/filters/file-mimetype-filter";
import { ParseFile } from '../files/pipes/parse-file.pipe';
import {UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import {MAX_IMAGE_SIZE, ROLES_ID} from "../constans/constans";
import {Roles} from "../roles/decorators/roles-auth.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {PromiseOptional} from "../interfacesAndTypes/optional.interface";
//import {FileElementResponse} from "../files/dto/file-response-element.response";


@Controller('advertisements')
export class AdvertisementsController {
    constructor(
        private readonly advertisementsService: AdvertisementsService,
        private readonly filesService: FilesService
    ) {
    }


    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('files', {fileFilter: fileMimetypeFilter('image'), limits: {fileSize: MAX_IMAGE_SIZE}}))
    async createAdvertisement(
        @UploadedFile(ParseFile) file: Express.Multer.File, // получаем 1 файл, который нам отправляют
        @User() currentUser: UserEntity,
        @Body() createAdvertDto: CreateAdvertisementDto): Promise<AdvertResponseInterfaceForCreate> {

        const imgSavedData: UploadApiResponse | UploadApiErrorResponse = await this.filesService.getSavedImgData(file);
        Object.assign(createAdvertDto, {img: imgSavedData.secure_url})
        const advertisement: AdvertisementsEntity = await this.advertisementsService.createAdvertisement(currentUser, createAdvertDto)

        return this.advertisementsService.buildAdvertisementResponseForCreate(advertisement);
    }


    @Get('/:slug')
    async getSingleAdvertisement(@Param('slug') slug: string): Promise<AdvertResponseInterface> {
        const advertisement: AdvertisementsEntity = await this.advertisementsService.getAdvertisementBySlug(slug)
        return this.advertisementsService.buildAdvertisementResponseForGetOne(advertisement)
    }


    @Get()
    async findAllActiveAdvertisements(@User('id') currentUserId: number, @Query() query: QueryInterface) : Promise<AdvertsResponseInterface> {
        return await this.advertisementsService.findAll(currentUserId, query, true) // возвращаем только рекламы прошедшие модерацию (isModerated=true)
    }
    // решил оставить эти гет запросы в таком виде, так как иметь разные ендпоинты удобнее для запросов на модерацию из админки
    @Get('/moderation/get')
    @Roles(ROLES_ID.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    async findAllAdvertisementsForModeration(@User('id') currentUserId: number, @Query() query: QueryInterface) : Promise<AdvertsResponseInterface> {
        return await this.advertisementsService.findAll(currentUserId, query, false) // возвращаем только рекламы не прошедшие модерацию (isModerated=false)
    }

    @Put('/moderation/set')
    @Roles(ROLES_ID.MODERATOR)
    @UseGuards(AuthGuard, RolesGuard)
    async setAdData (@Body('advertisements') updateAdvertDto: AdvertsResponseInterface): Promise<void> {
        return this.advertisementsService.setModeratedData(updateAdvertDto);
    }
}