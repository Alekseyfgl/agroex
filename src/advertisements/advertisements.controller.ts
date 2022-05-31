import {Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AdvertisementsService} from './advertisements.service';
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {AdvertisementsEntity} from "./advertisements.entity";
import {AdvertResponseInterfaceForGetOne, AdvertResponseInterfaceForCreate} from "./interface/advertResponseInterfaceForGetOne";


@Controller('advertisements')
export class AdvertisementsController {
    constructor(private readonly advertisementsService: AdvertisementsService) {
    }


    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createAdvertisement(
        @User() currentUser: UserEntity,
        @Body('advertisement') createAdvertDto: CreateAdvertisementDto): Promise<AdvertResponseInterfaceForCreate> {
        const advertisement: AdvertisementsEntity = await this.advertisementsService.createAdvertisement(currentUser, createAdvertDto)
        return this.advertisementsService.buildAdvertisementResponseForCreate(advertisement);
    }


    @Get(':slug')
    async getSingleAdvertisement(@Param('slug') slug: string): Promise<AdvertResponseInterfaceForGetOne> {
        const advertisement: AdvertisementsEntity = await this.advertisementsService.getAdvertisementBySlug(slug)
        return this.advertisementsService.buildAdvertisementResponseForGetOne(advertisement)
    }

}
