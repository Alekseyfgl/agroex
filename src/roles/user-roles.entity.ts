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
import { RolesEntity } from '../roles/roles.entity';

@Entity({ name: 'userRoles' })
export class UserRolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  role_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RolesEntity, (rolesEntity) => rolesEntity.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;
}
