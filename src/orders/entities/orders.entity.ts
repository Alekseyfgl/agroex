import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBetEntity } from '../../bets/user-bet.entity';
import { DEAL_STATUS } from '../interface/orders.interface';

@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20, default: DEAL_STATUS.CONFIRMED })
  dealStatus: string;

  @CreateDateColumn({ type: 'timestamptz' })
  orderCreated: Date;

  @OneToOne(() => UserBetEntity)
  @JoinColumn({ name: 'bet_id' })
  bet: UserBetEntity;
}
