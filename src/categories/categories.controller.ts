import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesEntity } from './categories.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLES_ID } from '../constans/constans';

@ApiTags('Categories of products')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get categories of products' })
  @ApiResponse({ status: 200, type: [CategoriesEntity] })
  @Get()
  async findAll(): Promise<CategoriesEntity[]> {
    return await this.categoriesService.findAllSortCategories();
  }
}
