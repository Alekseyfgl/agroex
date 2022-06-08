import {AbstractRepository, EntityRepository, MoreThan} from "typeorm";
import {CronJobsEntity} from "./cron-jobs.entity";


@EntityRepository(CronJobsEntity)
export class CronJobsRepository extends AbstractRepository<CronJobsEntity> {
    async saveCronJob(cronJobData: CronJobsEntity): Promise<void> {
        await this.repository.save(cronJobData)
    }

    async findAll(): Promise<CronJobsEntity[]> {
        return this.repository.find();
    }

    async findOne(name: string): Promise<CronJobsEntity[]> {
        return this.repository.find({name: name})
    }
}



