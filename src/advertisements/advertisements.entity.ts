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
import {ApiProperty, OmitType} from "@nestjs/swagger";

@Entity({ name: 'advertisements' })
export class AdvertisementsEntity {
  @ApiProperty({example: 2})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({example: 'Tasty apples'})
  @Column('varchar', { length: 200 })
  title: string;

  @ApiProperty({example: 'Uzbekistan'})
  @Column('varchar', { length: 100 })
  country: string;

  @ApiProperty({example: 'Bukhara Region'})
  @Column('varchar', { length: 300 })
  location: string;

  @ApiProperty({example: 'apples-qu6kke'})
  @Column('varchar', { unique: true })
  slug: string;

  @ApiProperty({example: 'Fruits'})
  @Column('varchar', { length: 100 })
  category: Category;

  @ApiProperty({default: null})
  @Column('varchar', { default: null, length: 100 })
  subCategory: string | null;

  @ApiProperty({default:false})
  @Column('boolean', { default: false })
  isModerated: boolean;

  @ApiProperty({default: false})
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

  @ApiProperty({default: null})
  @Column('varchar', { default: null })
  moderationComment: string | null;

  @ApiProperty({example: 5000})
  @Column('decimal', { precision: 18, scale: 2 })
  price: number;

  @ApiProperty({example: 'USD'})
  @Column('varchar', { length: 3 })
  currency: string;

  @ApiProperty({example: 'https://res.cloudinary.com/agroex-backend/image/upload/v1656319454/rs2k74crvmzu872fm5sh.webp'})
  @Column('varchar')
  img: string;

  @ApiProperty({example: 400})
  @Column('decimal', { precision: 18, scale: 2 })
  quantity: number;

  @ApiProperty({example: 'kg'})
  @Column('varchar', { length: 5 })
  unit: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // @ApiProperty({type: () =>OmitType(UserEntity, ['userRoles'])})
  @ApiProperty({type: () =>UserEntity})
  @ManyToOne(() => UserEntity, (user) => user.advertisements, { eager: true })
  author: UserEntity;

  @ApiProperty({type:  [UserBetEntity]})
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
