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

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 18 })
  phone: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { default: null })
  image?: string;

  @Column('boolean', { default: false })
  banned: boolean;

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
