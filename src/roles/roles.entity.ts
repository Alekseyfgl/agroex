import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEntity } from './user-roles.entity';
import { roleName } from './types/types';

@Entity({ name: 'roles' })
export class RolesEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'admin', description: 'Уникальное значение роли ' })
  @Column({ unique: true })
  roleName: roleName;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column()
  description: string;

  @OneToMany(() => UserRolesEntity, (userRolesEntity) => userRolesEntity.role, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'role_id' })
  userRoles!: UserRolesEntity[];
}
