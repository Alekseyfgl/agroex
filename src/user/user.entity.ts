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
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({example: 'anton@gmail.com'})
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty({example: 'Anton'})
  @Column('varchar', { length: 50 })
  username: string;

  @ApiProperty({example: '+375333456778'})
  @Column('varchar', { length: 18 })
  phone: string;

  @ApiProperty()
  @Column('varchar')
  password: string;

  @ApiProperty({example: null})
  @Column('varchar', { default: null  })
  image?: string;

  @ApiProperty({ example: false})
  @Column('boolean', { default: false })
  banned: boolean;

  @ApiProperty({example: null})
  @Column('varchar', { default: null, length: 200 })
  banReason: string;


  @ApiProperty({type: [UserRolesEntity]})
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

// @ApiProperty({type: UserBetEntity, isArray: true})
  @OneToMany(() => UserBetEntity, (userBetEntity) => userBetEntity.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'user_id' })
  userBets!: UserBetEntity[];
}
