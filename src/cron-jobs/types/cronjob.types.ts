export type CronJobSaving = {
  name: string;
  date: Date;
  targetId: number;
  jobType: cronJobName;
};

export type cronJobName = 'updateBet' | 'updateAdvertisement';
