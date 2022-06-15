import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { UserBetEntity } from '../bets/user-bet.entity';
import { cronJobName } from './types/cronjob.types';

@Entity({ name: 'cronJobs' })
export class CronJobsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  jobType: cronJobName;

  @CreateDateColumn()
  date: Date;

  @Column('integer')
  targetId: number;
}
