import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesEntity } from './categories.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ORDER_CATEGORIES } from '../constans/constans';

@ApiTags('Categories of products')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get categories of products' })
  @ApiResponse({ status: 200, type: [CategoriesEntity] })
  @Get()
  async findAll(
    ORDER_CATEGORIES: ORDER_CATEGORIES.ASC,
  ): Promise<CategoriesEntity[]> {
    return await this.categoriesService.findAllSortCategories(ORDER_CATEGORIES);
  }
}
