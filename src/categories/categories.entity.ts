import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @ApiProperty({ example: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'img' })
  @Column()
  img: string;
}
