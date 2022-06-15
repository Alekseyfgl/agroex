import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import {OrdersEntity} from "../orders/entities/orders.entity";

@Entity({ name: 'userBets' })
export class UserBetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  advertisement_id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  expireBet: Date;

  @Column('decimal', { precision: 18, scale: 2 })
  betValue: number;

  @Column('boolean', { default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userBets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => AdvertisementsEntity, (advertisementEntity) => advertisementEntity.userBets)
  @JoinColumn({ name: 'advertisement_id' })
  advertisement: AdvertisementsEntity;

  // @OneToOne(() => OrdersEntity, (order) => order.bet) // specify inverse side as a second parameter
  // @JoinColumn()
  // order: OrdersEntity
}
