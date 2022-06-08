import {forwardRef, Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CronJobsRepository} from "./cron-jobs.repository";
import {CronJob} from "cron";
import {SchedulerRegistry} from "@nestjs/schedule";
import {BetRepository} from "../bet/bet.repository";
import {BetService} from "../bet/bet.service";
import {CronJobsEntity} from "./cron-jobs.entity";

@Injectable()
export class CronJobsService implements OnModuleInit {
    constructor(
        @Inject(forwardRef(() => BetService))
        private readonly betService: BetService,
        private readonly cronJobsRepository: CronJobsRepository,
        private schedulerRegistry: SchedulerRegistry
    ) {}

    private readonly logger: Logger = new Logger(BetRepository.name);

    async onModuleInit(): Promise<void> {
        const savedCronJobs: CronJobsEntity[] = await this.findAll();

        savedCronJobs.forEach((cronJob => {
            try {
                this.schedulerRegistry.getCronJob(cronJob.name)
            }
            catch (e) {
                if (cronJob.date < new Date(Date.now())) {
                    // достали из бд CronJob - дата старая - отправляю в betService проверить (на случай если сервер долго спал)
                    this.betService.updateColumnIsActive(cronJob.betId);
                } else {
                    //достали из бд CronJob - дата новая - отправляю на добавление
                    this.addCronJob(cronJob.name, cronJob.date, cronJob.betId)
                }
            }
        }))
    }

    async saveCronJob(name: string, expireBet: Date, savedBetId: number): Promise<void> {
        const cronJobData: CronJobsEntity = new CronJobsEntity;
         Object.assign(cronJobData,{
            name: name,
            date: (new Date(expireBet)),
            betId: savedBetId
        })

        await this.cronJobsRepository.saveCronJob(cronJobData)
    }

    async findAll(): Promise<CronJobsEntity[]>  {
        return this.cronJobsRepository.findAll()
    }

    async addCronJob(name: string, expireBet: Date, savedBetId: number): Promise<void> {
        // создаём CronJob
        const job: CronJob = new CronJob(new Date(expireBet), () => {
            this.betService.updateColumnIsActive(savedBetId);
            this.logger.warn(`time for job ${name} to run`);
        });

        this.schedulerRegistry.addCronJob(name, job);

        const foundCronJob = await this.cronJobsRepository.findOne(name);
            if (foundCronJob.length === 0) {
                // сохраняем новый CronJob в бд
                await this.saveCronJob(name, expireBet, savedBetId)
            }

        job.start();

        this.logger.warn(
            `job ${name} added for update column at ${new Date(expireBet)}!`,
        );
    }
}
