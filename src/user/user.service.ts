import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { UserEntity } from './user.entity';
import { LoginUserDto } from '../auth/dto/loginUserDto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from '../roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.createUser(createUserDto);
  }

  async getRegisteredUser(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
    const user: CreateUserDto = await this.userRepository.checkUserByEmail(
      loginUserDto,
    );
    const isPassword: UserEntity =
      await this.userRepository.checkPasswordFromEmail(loginUserDto);
    const isBanned: boolean = await this.userRepository.checkIsBanned(
      loginUserDto,
    );
    return user && isPassword && isBanned ? user : null;
  }

  async getUserById(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.findUserById(user.id);
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const role = await this.roleService.getRoleByValue(dto.roleName);
    return await this.userRepository.addRole(dto, role);
  }

  async addBan(dto: BanUserDto): Promise<void> {
    return this.userRepository.addBan(dto);
  }
}
