import { Injectable } from '@nestjs/common';
import { CategoriesEntity } from './categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderInterface } from './interface/orderInterface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async findAllSortCategories(
    order: OrderInterface,
  ): Promise<CategoriesEntity[]> {
    return await this.categoriesRepository.find({
      order: {
        title: order.orderType,
      },
    });
  }
}
