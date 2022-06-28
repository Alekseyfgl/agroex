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
import {ApiProperty} from "@nestjs/swagger";

@Entity({ name: 'advertisements' })
export class AdvertisementsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  title: string;

  @ApiProperty()
  @Column('varchar', { length: 100 })
  country: string;

  @ApiProperty()
  @Column('varchar', { length: 300 })
  location: string;

  @ApiProperty()
  @Column('varchar', { unique: true })
  slug: string;

  @ApiProperty()
  @Column('varchar', { length: 100 })
  category: Category;

  @ApiProperty()
  @Column('varchar', { default: null, length: 100 })
  subCategory: string | null;

  @ApiProperty()
  @Column('boolean', { default: false })
  isModerated: boolean;

  @ApiProperty()
  @Column('boolean', { default: false })
  isActive: boolean;

  @ApiProperty({
    default: false
  })
  @Column('boolean', { default: false })
  isConfirmed: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  expireAdvert: Date;

  @ApiProperty()
  @Column({ default: ModerationStatus.UNMODERATED })
  moderationStatus: ModerationStatus;

  @ApiProperty()
  @Column('varchar', { default: null })
  moderationComment: string | null;

  @ApiProperty()
  @Column('decimal', { precision: 18, scale: 2 })
  price: number;

  @ApiProperty()
  @Column('varchar', { length: 3 })
  currency: string;

  @ApiProperty()
  @Column('varchar')
  img: string;

  @ApiProperty()
  @Column('decimal', { precision: 18, scale: 2 })
  quantity: number;

  @ApiProperty()
  @Column('varchar', { length: 5 })
  unit: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({type: () => UserEntity})
  @ManyToOne(() => UserEntity, (user) => user.advertisements, { eager: true })
  author: UserEntity;

  @ApiProperty({type: [UserBetEntity]})
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
