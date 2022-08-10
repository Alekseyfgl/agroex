import {Body, Controller, Get, Patch, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import {ApiOperation, ApiResponse, ApiSecurity, ApiTags} from '@nestjs/swagger';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLES_ID } from '../constans/constans';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import {ModerationDataDto} from "./dto/user-moderation.dto";
import {ApprovedUserGuard} from "./guards/approvedUser.guard";
import {Users} from "./interfacesAndTypes/user.type";
import {PromiseOptional} from "../interfacesAndTypes/optional.interface";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @ApiOperation({ summary: 'Get users for moderation' })
  @ApiSecurity('JWT-auth')
  @ApiResponse({ status: 200 })
  @Get('/moderation')
  @Roles(ROLES_ID.MODERATOR)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Body() dto: AddRoleDto): Promise<Users> {
    return this.userService.getUnmoderatedUsers()
  }

  @ApiOperation({ summary: 'Set users moderation data' })
  @ApiSecurity('JWT-auth')
  @ApiResponse({ status: 200 })
  @UsePipes(new ValidationPipe())
  @Patch('/moderation')
  @Roles(ROLES_ID.MODERATOR)
  @UseGuards(AuthGuard, RolesGuard)
  setModerationData(@Body() moderationDataDto: ModerationDataDto): PromiseOptional<void> {
    return this.userService.setModerationData(moderationDataDto)
  }


  @ApiOperation({ summary: 'Add role for user' })
  @ApiSecurity('JWT-auth')
  @ApiResponse({ status: 200 })
  @Post('/role')
  @Roles(ROLES_ID.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  addRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiSecurity('JWT-auth')
  @ApiResponse({ status: 200 })
  @Post('/ban')
  @Roles(ROLES_ID.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  addBan(@Body() dto: BanUserDto): Promise<void> {
    return this.userService.addBan(dto);
  }
}
