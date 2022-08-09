import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
import { UserRepository } from './user.repository';
import {CreateCompanyDto, CreatePersonDto} from '../auth/dto/createUser.dto';
import { UserEntity } from './user.entity';
import { LoginUserDto } from '../auth/dto/loginUserDto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from '../roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import {usersForResponse} from "./users.mapper";
import {ModerationStatus} from "../advertisements/interface/interfacesAndTypes";
import {UserResponseInterface} from "./interfacesAndTypes/userResponse.interface";
import {Users} from "./interfacesAndTypes/user.type";
import {PromiseOptional} from "../interfacesAndTypes/optional.interface";
import {MessageError} from "../constans/constans";


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreatePersonDto|CreateCompanyDto): Promise<UserEntity> {
    return await this.userRepository.createUser(createUserDto);
  }

  async getRegisteredUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.checkUserByEmail(
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

  async getUnmoderatedUsers(): Promise<Users> {
    const users: UserEntity[] = await this.userRepository.getUnmoderatedUsers();
    return {users: users.map(user => usersForResponse(user))}
  }

  async setModerationData(moderationDataDto): PromiseOptional<void> {
    const existUser: UserEntity = await this.userRepository.findUserById(moderationDataDto.userId)

    if (existUser.moderationStatus === ModerationStatus.APPROVED) {
      throw new BadRequestException(MessageError.USER_IS_ALREADY_BEEN_APPROVED)
    }

    return this.userRepository.setModerationData(moderationDataDto);
  }
}
