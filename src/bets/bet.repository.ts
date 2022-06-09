import {AbstractRepository, EntityRepository} from "typeorm";
import {UserBetEntity} from "./user-bet.entity";
import {Cron, SchedulerRegistry, Timeout} from '@nestjs/schedule';
import {Body, HttpException, HttpStatus, Logger} from "@nestjs/common";
import {CreateBetDto} from "./dto/createBet.dto";
import {UserEntity} from "../user/user.entity";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {MessageError} from "../constans/constans";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";
import {UserEntity} from "../user/user.entity";
import {CreateBetDto} from "./dto/createBet.dto";
import {PromiseOptional} from "../interfacesAndTypes/optional.interface";


@EntityRepository(UserBetEntity)
export class BetRepository extends AbstractRepository<UserBetEntity> {

    
    async createBet(advert: AdvertisementsEntity, user: UserEntity, betObj: CreateBetDto): Promise<void> {

        await this.repository.save({
            user_id: user.id,
            advertisement_id: advert.id,
            betValue: +betObj.betValue
        })
        await this.changePreviousBet(advert.id)
    }


    async getAdvertisementWithLastBet(advert_id: number): PromiseOptional<betAndAdvertInterface[]> {

        const sql: string = `SELECT * FROM advertisements AS adv
                        LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id where adv.id = ${advert_id}
                        ORDER BY adv."createAt" DESC, ub.created_at DESC
                        limit 1 offset 0`;
        try {
            return  await this.repository.query(sql)
        } catch (e) {
            return null
        }
    }

    private async changePreviousBet(advert_id: number): Promise<void> {
        const sql: string = `SELECT * FROM advertisements AS adv
                        LEFT JOIN "userBets" AS ub ON adv.id=ub.advertisement_id where adv.id = ${advert_id}
                        ORDER BY adv."createAt" DESC, ub.created_at DESC
                        limit 1 offset 1`

        try {
            const penultimateBet: betAndAdvertInterface[] = await this.repository.query(sql)

            if (penultimateBet[0].isActive && penultimateBet.length) {
                await this.repository.update({id: penultimateBet[0].id}, {isActive: false})
            }
        } catch (e) {
            console.log(e)
        }
    }

}



