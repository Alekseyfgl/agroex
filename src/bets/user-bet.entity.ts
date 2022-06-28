import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({ name: 'userBets' })
export class UserBetEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('int')
  user_id: number;

  @ApiProperty()
  @Column('int')
  advertisement_id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @Column('decimal', { precision: 18, scale: 2 })
  betValue: number;

  @ApiProperty()
  @Column('boolean', { default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userBets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => AdvertisementsEntity,
    (advertisementEntity) => advertisementEntity.userBets,
  )
  @JoinColumn({ name: 'advertisement_id' })
  advertisement: AdvertisementsEntity;
}
