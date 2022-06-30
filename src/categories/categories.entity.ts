import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Fruits' })
  @Column('varchar', { length: 100 })
  title: string;
  
  @ApiProperty({ example: 'img' })
  @Column('varchar')
  img: string;
}
