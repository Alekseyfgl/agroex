import { Injectable, Query } from '@nestjs/common';
import { CategoriesEntity } from './categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesInterface } from './interface/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async findAllSortCategories(
    @Query() order: CategoriesInterface,
  ): Promise<CategoriesEntity[]> {
    return await this.categoriesRepository.find({
      order: {
        title: order.orderType,
      },
    });
  }
}
