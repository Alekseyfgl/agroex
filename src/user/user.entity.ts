import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { numToEncode } from '../constans/constans';
import { UserRolesEntity } from '../roles/user-roles.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { UserBetEntity } from '../bets/user-bet.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty()
  @Column('varchar', { length: 50 })
  username: string;

  @ApiProperty()
  @Column('varchar', { length: 18 })
  phone: string;

  @ApiProperty()
  @Column('varchar')
  password: string;

  @ApiProperty({
    default: null
  })
  @Column('varchar', { default: null })
  image?: string;

  @ApiProperty({
    default: false
  })
  @Column('boolean', { default: false })
  banned: boolean;

  @ApiProperty({
    default: null
  })
  @Column('varchar', { default: null, length: 200 })
  banReason: string;


  @OneToMany(() => UserRolesEntity, (userRolesEntity) => userRolesEntity.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'user_id' })
  userRoles!: UserRolesEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, numToEncode);
  }


  @OneToMany(
    () => AdvertisementsEntity,
    (advertisement) => advertisement.author,
  )
  advertisements: AdvertisementsEntity[];


  @OneToMany(() => UserBetEntity, (userBetEntity) => userBetEntity.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'user_id' })
  userBets!: UserBetEntity[];
}
