import {Body, forwardRef, Inject, Injectable, Logger, Param} from '@nestjs/common';
import {CreateBetDto} from './dto/createBet.dto';
import {User} from "../user/decorators/user.decarator";
import {UserEntity} from "../user/user.entity";
import {BetRepository} from "./bet.repository";
import {AdvertisementsService} from "../advertisements/advertisements.service";
import slugify from "slugify";
import {UserService} from "../user/user.service";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {SchedulerRegistry} from "@nestjs/schedule";
import {CronJobsService} from "../cron-jobs/cron-jobs.service";
import {UserBetEntity} from "./user-bet.entity";

@Injectable()
export class BetService {
    constructor(
        @Inject(forwardRef(() => CronJobsService))
        private readonly cronJobsService: CronJobsService,
        private readonly userService: UserService,
        private readonly betRepository: BetRepository,
        private readonly advertisementsService: AdvertisementsService,
        ) {
    }


    async createBet(@Body() bet: CreateBetDto, @User() currentUser: UserEntity, @Param() slug: string): Promise<UserBetEntity> {
        const currentSlug: string = Object.values(slug)[0]
        const advert : AdvertisementsEntity  = await this.advertisementsService.getAdvertisementBySlug(currentSlug);
        const user : UserEntity = await this.userService.getUserById(currentUser);
        const savedBet: UserBetEntity  = await this.betRepository.createBet(advert, user, bet);
        const expireBet: Date = savedBet.expireBet;

        await this.cronJobsService.addCronJob(`checkBetIsActive-${currentSlug}-${user.id}-${savedBet.id}`, expireBet, savedBet.id);

        return savedBet
    }

    async updateColumnIsActive(savedBetId: number): Promise<void> {
        this.betRepository.updateColumnIsActive(savedBetId);
    }

}
