import {BeforeInsert, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { hash } from 'bcrypt';
import { numToEncode } from '../constans/constans';
import {UserRolesEntity} from "../roles/user-roles.entity";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column() //так мы исключаем пароль по умолчанию
  password: string;

  @Column({ default: null })
  image?: string;

  @Column({ default: false })
  banned: boolean;

  @Column({ default: null })
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

  @OneToMany(()=> AdvertisementsEntity,(advertisement) => advertisement.author)
  advertisements: AdvertisementsEntity[]

}
