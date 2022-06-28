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
import {ApiProperty} from "@nestjs/swagger";

@Entity({ name: 'orders' })
export class OrdersEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 20, default: DEAL_STATUS.CONFIRMED })
  dealStatus: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  orderCreated: Date;


  @OneToOne(() => UserBetEntity)
  @JoinColumn({ name: 'bet_id' })
  // @ApiProperty()
  bet: UserBetEntity;
}
