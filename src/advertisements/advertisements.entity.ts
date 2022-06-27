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
import { Category, ModerationStatus } from './interface/interfacesAndTypes';

@Entity({ name: 'advertisements' })
export class AdvertisementsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 200 })
  title: string;

  @Column('varchar', { length: 100 })
  country: string;

  @Column('varchar', { length: 300 })
  location: string;

  @Column('varchar', { unique: true })
  slug: string;

  @Column('varchar', { length: 100 })
  category: Category;

  @Column('varchar', { default: null, length: 100 })
  subCategory: string | null;

  @Column('boolean', { default: false })
  isModerated: boolean;

  @Column('boolean', { default: false })
  isActive: boolean;

  @Column('boolean', { default: false })
  isConfirmed: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  expireAdvert: Date;

  @Column({ default: ModerationStatus.UNMODERATED })
  moderationStatus: ModerationStatus;

  @Column('varchar', { default: null })
  moderationComment: string | null;

  @Column('decimal', { precision: 18, scale: 2 })
  price: number;

  @Column('varchar', { length: 3 })
  currency: string;

  @Column('varchar')
  img: string;

  @Column('decimal', { precision: 18, scale: 2 })
  quantity: number;

  @Column('varchar', { length: 5 })
  unit: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.advertisements, { eager: true })
  author: UserEntity;

  @OneToMany(
    () => UserBetEntity,
    (userBetEntity) => userBetEntity.advertisement,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ referencedColumnName: 'advertisement_id' })
  userBets!: UserBetEntity[];
}
