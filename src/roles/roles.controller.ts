import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from './decorators/roles-auth.decorator';
import { ROLES_ID } from '../constans/constans';
import { Optional } from '../interfacesAndTypes/optional.interface';
import { RolesEntity } from './roles.entity';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post('/add')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES_ID.ADMIN)
  create(@Body() dto: CreateRoleDto): Promise<Optional<RolesEntity>> {
    return this.roleService.createRole(dto);
  }
}
