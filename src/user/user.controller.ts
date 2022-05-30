import {Body, Controller, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Roles} from "../roles/decorators/roles-auth.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {ROLES_ID} from "../constans/constans";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {UserEntity} from "./user.entity";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: 'Выдать роль'})
  @ApiResponse({status: 200})
  @Roles(ROLES_ID.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
    return this.userService.addRole(dto);
  }

  @ApiOperation({summary: 'Забанить пользователя'})
  @ApiResponse({status: 200})
  @Roles(ROLES_ID.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/ban')
  addBan(@Body() dto: BanUserDto): Promise<HttpStatus> {
    return this.userService.addBan(dto);
  }

}
