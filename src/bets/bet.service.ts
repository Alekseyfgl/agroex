import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

        const AdvertisementWithLastBet: betAndAdvertInterface[] = await this.betRepository.getAdvertisementWithLastBet(advert.id);

        const priceSeller: number = +advert.price;
        const lastBet: number = +AdvertisementWithLastBet[0].betValue;
        const currentBet: number = bet.betValue;


        if (currentBet > priceSeller) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: ['Your price is higher than the seller'],
                },
                HttpStatus.NOT_FOUND,
            );
        }


        if (!lastBet && priceSeller > currentBet) {

            await this.betRepository.createBet(advert, user, bet);

        } else if (lastBet < currentBet && priceSeller > currentBet) {

            await this.betRepository.createBet(advert, user, bet);

        } else {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: ['Refresh the page, bets have already changed'],
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
