import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CronJobsRepository} from "./cron-jobs.repository";
import {CronJob} from "cron";
import {SchedulerRegistry} from "@nestjs/schedule";
import {BetRepository} from "../bets/bet.repository";
import {CronJobsEntity} from "./cron-jobs.entity";
import {CronBetRepository} from "./cronBet.repository";
import {CronAdvertisementRepository} from "./cron-advertisement-repository";
import {cronJobName, CronJobSaving} from "./types/cronjob.types";

@Injectable()
export class CronJobsService implements OnModuleInit {
    constructor(
        private readonly cronJobsRepository: CronJobsRepository,
        private readonly betRepository: CronBetRepository,
        private readonly advertisementRepository: CronAdvertisementRepository,
        private schedulerRegistry: SchedulerRegistry
    ) {}

    private readonly logger: Logger = new Logger(BetRepository.name);

    async onModuleInit(): Promise<void> {
        const savedCronJobs: CronJobsEntity[] = await this.cronJobsRepository.findAll();

        savedCronJobs.forEach((cronJob => {
            try {
                this.schedulerRegistry.getCronJob(cronJob.name)
            }
            catch (e) {
                if (cronJob.date < new Date(Date.now())) {
                    this.createCronJob(cronJob.jobType, cronJob.targetId)
                } else {
                    //достали из бд CronJob - дата новая - отправляю на добавление
                    this.addCronJob(cronJob.name, cronJob.date, cronJob.targetId, cronJob.jobType)
                }
            }
        }))
    }

    async saveCronJob(name: string, expireBet: Date, targetId: number, jobType: cronJobName): Promise<void> {
        const cronJobData: CronJobSaving= {
            name: name,
            date: (new Date(expireBet)),
            jobType: jobType,
            targetId: targetId
        }

        await this.cronJobsRepository.saveCronJob(cronJobData)
    }

    async addCronJob(name: string, expireBet: Date, targetId: number, jobType: cronJobName): Promise<void> {
        // создаём CronJob
        const job: CronJob = new CronJob(new Date(expireBet), () => {
            this.createCronJob(jobType, targetId)
            this.logger.warn(`time for job ${name} to run`);
        });

        this.schedulerRegistry.addCronJob(name, job);

        const foundCronJob: CronJobsEntity = await this.cronJobsRepository.findOne(name);
            if (!foundCronJob) {
                // сохраняем новый CronJob в бд
                await this.saveCronJob(name, expireBet, targetId, jobType)
            }

        job.start();

        this.logger.warn(
            `job ${name} added for update column at ${new Date(expireBet)}!`,
        );
    }

    async createCronJob(jobType: cronJobName, targetId: number) {
        if (jobType === 'updateBet'){ // если бет - обновляем бет
            await this.betRepository.updateColumnIsActive(targetId)
        }

        if (jobType === 'updateAdvertisement'){ // если adv - обновляем adv
            await this.advertisementRepository.updateColumnIsActive(targetId)
        }

    }
}
