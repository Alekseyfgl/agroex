import { AbstractRepository, EntityRepository } from 'typeorm';
import { CronJobsEntity } from './cron-jobs.entity';
import { CronJobSaving } from './types/cronjob.types';

@EntityRepository(CronJobsEntity)
export class CronJobsRepository extends AbstractRepository<CronJobsEntity> {
  async saveCronJob(cronJobData: CronJobSaving): Promise<void> {
    await this.repository.save(cronJobData);
  }

  async findAll(): Promise<CronJobsEntity[]> {
    return this.repository.find();
  }

  async findOne(name: string): Promise<CronJobsEntity> {
    return this.repository.findOne({ name: name });
  }
}
