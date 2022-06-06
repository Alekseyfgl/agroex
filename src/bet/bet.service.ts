import {Body, Injectable, Param} from '@nestjs/common';
import {CreateBetDto} from './dto/createBet.dto';
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
import {BetRepository} from "./bet.repository";
import {AdvertisementsService} from "../advertisements/advertisements.service";
import slugify from "slugify";
import {UserService} from "../user/user.service";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";

@Injectable()
export class BetService {
    constructor(private readonly betRepository: BetRepository,
                private readonly advertisementsService: AdvertisementsService,
                private readonly userService: UserService) {
    }


    async createBet(@Body() bet: CreateBetDto, @User() currentUser: UserEntity, @Param() slug: string) {
        const currentSlug = Object.values(slug)[0]
        const advert : AdvertisementsEntity  = await this.advertisementsService.getAdvertisementBySlug(currentSlug);
        const user : UserEntity = await this.userService.getUserById(currentUser);

        return await this.betRepository.createBet(advert, user, bet)
    }

}
