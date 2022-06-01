import { Injectable } from '@nestjs/common';
import { CategoriesEntity } from './categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ORDER } from '../constans/constans';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async findAllSortCategories(): Promise<CategoriesEntity[]> {
    return await this.categoriesRepository.find({
      order: {
        title: ORDER.ASC,
      },
    });
  }
}
