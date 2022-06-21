import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {DeviceTypes} from "./interfacesAndTypes/interfacesAndTypes";

@Entity({ name: 'fireBaseTokens' })
export class fireBaseTokensEntity {

  @ApiProperty({ example: 'id' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'user_id' })
  @Column('int')
  userId: number;

  @ApiProperty({ example: 'device_type' })
  @Column('varchar')
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
