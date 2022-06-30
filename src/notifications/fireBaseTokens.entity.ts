import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DeviceTypes } from './interfacesAndTypes/interfacesAndTypes';

@Entity({ name: 'fireBaseTokens' })
export class FireBaseTokensEntity {
  @ApiProperty({ example: 'user_id' })
  @Column({ type: 'int', primary: true })
  userId: number;

  @ApiProperty({ example: 'device_type' })
  @Column({ type: 'varchar', primary: true })
  deviceType: DeviceTypes;

  @ApiProperty({ example: 'token' })
  @Column('varchar')
  token: string;

  @Column('boolean', { default: false })
  isAllowed: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
