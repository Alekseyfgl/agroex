import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBetEntity } from '../../bets/user-bet.entity';

@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20, default: 'confirmed' })
  dealStatus: string;

  @CreateDateColumn({ type: 'timestamptz' })
  orderCreated: Date;

  @OneToOne(() => UserBetEntity)
  @JoinColumn({ name: 'bet_id' })
  bet: UserBetEntity;
}
