import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { RolesEntity } from './roles.entity';
import {ApiProperty, OmitType} from "@nestjs/swagger";

@Entity({ name: 'userRoles' })
export class UserRolesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 5})
  @Column()
  user_id: number;

  @ApiProperty({example: 1})
  @Column()
  role_id: number;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;


  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;


  // @ApiProperty({type: RolesEntity})
  // @ApiProperty({type: OmitType(RolesEntity, ['userRoles'])})
  @ManyToOne(() => RolesEntity, (rolesEntity) => rolesEntity.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;
}
