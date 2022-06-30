import { cronJobName } from '../../cron-jobs/types/cronjob.types';

export enum DeviceTypes {
  WEB = 'web',
  IOS = 'iOS',
  ANDROID = 'android',
}

export type FireBaseTokenSaving = {
  userId: number;
  deviceType: DeviceTypes;
  token: string;
  isAllowed: boolean;
};
