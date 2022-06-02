import {
    Body,
    Controller,
    Get,
    Param,
    Post, Query,
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
    @UseInterceptors(FileInterceptor('files', {fileFilter: fileMimetypeFilter('image')}))
    async createAdvertisement(
        @UploadedFile(ParseFile) file: Express.Multer.File, // получаем 1 файл, который нам отправляют
        @User() currentUser: UserEntity,
        @Body() createAdvertDto: CreateAdvertisementDto): Promise<AdvertResponseInterfaceForCreate> {

        const imgSavedData: UploadApiResponse | UploadApiErrorResponse = await this.filesService.getSavedImgData(file);
        Object.assign(createAdvertDto, {img: imgSavedData.secure_url})
        const advertisement: AdvertisementsEntity = await this.advertisementsService.createAdvertisement(currentUser, createAdvertDto)

        return this.advertisementsService.buildAdvertisementResponseForCreate(advertisement);
    }


    @Get(':slug')
    async getSingleAdvertisement(@Param('slug') slug: string): Promise<AdvertResponseInterface> {
        const advertisement: AdvertisementsEntity = await this.advertisementsService.getAdvertisementBySlug(slug)
        return this.advertisementsService.buildAdvertisementResponseForGetOne(advertisement)
    }

    @Get()
    async findAllAdvertisements(@User('id') currentUserId: number, @Query() query: QueryInterface) : Promise<AdvertsResponseInterface> {
        return await this.advertisementsService.findAll(currentUserId, query)
    }

}