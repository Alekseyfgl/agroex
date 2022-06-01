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
import {FileElementResponse} from "../files/dto/file-response-element.response";
import {FilesService} from "../files/files.service";


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
    @UseInterceptors(FileInterceptor('files'))
    async createAdvertisement(
        @UploadedFile() file: Express.Multer.File, // получаем 1 файл, который нам отправляют
        @User() currentUser: UserEntity,
        @Body() createAdvertDto: CreateAdvertisementDto): Promise<AdvertResponseInterfaceForCreate> {


        const imgSavedData: FileElementResponse = await this.filesService.getImgUrl(file);
        createAdvertDto.img = imgSavedData.url;

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
