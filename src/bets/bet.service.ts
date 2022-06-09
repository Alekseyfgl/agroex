import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBetDto} from './dto/createBet.dto';
import {UserEntity} from "../user/user.entity";
import {BetRepository} from "./bet.repository";
import {AdvertisementsService} from "../advertisements/advertisements.service";
import {UserService} from "../user/user.service";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {MessageError} from "../constans/constans";
import {CronJobsService} from "../cron-jobs/cron-jobs.service";
import {UserBetEntity} from "./user-bet.entity";

@Injectable()
export class BetService {
    constructor(private readonly betRepository: BetRepository,
                private readonly advertisementsService: AdvertisementsService,
                private readonly userService: UserService,
                private readonly cronJobsService: CronJobsService) {
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
                    status: HttpStatus.BAD_REQUEST,
                    message: [MessageError.HIGHER_PRICE_THAN_SELLER],
                },
                HttpStatus.BAD_REQUEST,
            );
        }


        if (!lastBet && priceSeller > currentBet) {

            const savedBet: UserBetEntity = await this.betRepository.createBet(advert, user, bet);
            const expireBet: Date = savedBet.expireBet;
            await this.cronJobsService.addCronJob(`checkBetIsActive-${currentSlug}-${user.id}-${savedBet.id}`, expireBet, savedBet.id, 'updateBet');
        } else if (lastBet < currentBet && priceSeller > currentBet) {

            const savedBet: UserBetEntity = await this.betRepository.createBet(advert, user, bet);
            const expireBet: Date = savedBet.expireBet;
            await this.cronJobsService.addCronJob(`checkBetIsActive-${currentSlug}-${user.id}-${savedBet.id}`, expireBet, savedBet.id, 'updateBet');

        } else {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    message: [MessageError.NEED_TO_REFRESH_THE_PAGE],
                },
                HttpStatus.CONFLICT,
            );
        }
    }

}
