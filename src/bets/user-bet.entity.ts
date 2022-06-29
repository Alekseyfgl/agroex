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
  @ApiProperty({example:3})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example:1})
  @Column('int')
  user_id: number;

  @ApiProperty({example:33})
  @Column('int')
  advertisement_id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty({example:500})
  @Column('decimal', { precision: 18, scale: 2 })
  betValue: number;

  @ApiProperty({example: true})
  @Column('boolean', { default: true })
  isActive: boolean;

  // @ApiProperty({type: ()=> UserEntity})
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userBets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // @ApiProperty({type: UserBetEntity, isArray: true})
  @ManyToOne(
    () => AdvertisementsEntity,
    (advertisementEntity) => advertisementEntity.userBets,
  )
  @JoinColumn({ name: 'advertisement_id' })
  advertisement: AdvertisementsEntity;
}
