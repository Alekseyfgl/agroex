import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AdvertisementsService} from './advertisements.service';
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
import {CreateAdvertisementDto} from "./dto/createAdvertisement.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {request} from "express";


@Controller('advertisements')
export class AdvertisementsController {
    constructor(private readonly advertisementsService: AdvertisementsService) {
    }


    @Post()
    @UseGuards(AuthGuard)
    async createAdvertisement(@User() currentUser: UserEntity, @Body('advertisement') createAdvertDto: CreateAdvertisementDto) {
        const advert =await  this.advertisementsService.createAdvertisement(currentUser, createAdvertDto)
        // return this.advertisementsService.buildAdvertisementResponse(advert)
        return await this.advertisementsService.buildArticleResponse(advert)
    }


}
