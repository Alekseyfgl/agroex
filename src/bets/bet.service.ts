import {Injectable} from '@nestjs/common';
import {CreateBetDto} from './dto/createBet.dto';
import {UserEntity} from "../user/user.entity";
import {BetRepository} from "./bet.repository";
import {AdvertisementsService} from "../advertisements/advertisements.service";
import {UserService} from "../user/user.service";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";

@Injectable()
export class BetService {
    constructor(private readonly betRepository: BetRepository,
                private readonly advertisementsService: AdvertisementsService,
                private readonly userService: UserService) {
    }


    async createBet(bet: CreateBetDto, currentUser: UserEntity, slug: string): Promise<void> {
        const currentSlug: string = Object.values(slug)[0]
        const advert: AdvertisementsEntity = await this.advertisementsService.getAdvertisementBySlug(currentSlug);
        const user: UserEntity = await this.userService.getUserById(currentUser);

        await this.betRepository.createBet(advert, user, bet)
    }
}
