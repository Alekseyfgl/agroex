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
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'user' })
  @Column('varchar', { unique: true })
  roleName: roleName;

  @ApiProperty({ example: 'Some description'})
  @Column('varchar', { length: 100 })
  description: string;

  @ApiProperty({type: UserRolesEntity})
  @OneToMany(() => UserRolesEntity, (userRolesEntity) => userRolesEntity.role, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'role_id' })
  userRoles!: UserRolesEntity[];
}
