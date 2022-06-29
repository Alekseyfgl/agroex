import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DB_RELATIONS, MessageError, ROLES_ID } from '../constans/constans';
import { LoginUserDto } from '../auth/dto/loginUserDto';
import { compare } from 'bcrypt';
import { RolesEntity } from '../roles/roles.entity';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Optional } from '../interfacesAndTypes/optional.interface';

@EntityRepository(UserEntity)
export class UserRepository extends AbstractRepository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(MessageError.EMAIL_IS_TAKEN, HttpStatus.BAD_REQUEST)
    }

    const newUser: UserEntity = new UserEntity();
    Object.assign(newUser, createUserDto, {
      userRoles: [{ role_id: +ROLES_ID.USER }],
    });
    // Listeners currently only work when attempting to save proper Entity class instances (not plain objects)
    return await this.repository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        email: email,
      },
      relations: [DB_RELATIONS.USER_ROLES, DB_RELATIONS.ROLES],
    });
  }

  async checkPasswordFromEmail(loginUserDto: LoginUserDto) {
    const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
    const isPassword: boolean = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPassword) {
      throw new HttpException(MessageError.INCORRECT_DATA, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async checkUserByEmail(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
    const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException(MessageError.INCORRECT_DATA, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async checkIsBanned(loginUserDto: LoginUserDto): Promise<boolean> {
    const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
    if (user.banned) {
      throw new HttpException(MessageError.ACCESS_DENIED, HttpStatus.FORBIDDEN)
    }
    return true;
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.repository.findOne({
      where: { id: id },
      //      userRoles- назв таблицы               userRoles.role
      //      userBets- назв таблицы             userBets
      relations: ['userBets', DB_RELATIONS.USER_ROLES, DB_RELATIONS.ROLES],
    });

    if (!user) {
      throw new HttpException(MessageError.USER_ID_NOT_FOUND, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async addRole(
    dto: AddRoleDto,
    role: Optional<RolesEntity>,
  ): Promise<AddRoleDto> {
    const user: UserEntity = await this.findUserById(dto.userId);

    if (role) {
      if (
        user.userRoles.some((userRole) => [role.id].includes(userRole.role_id))
      ) {
        throw new HttpException(MessageError.ROLE_IS_ALREADY_ADDED, HttpStatus.BAD_REQUEST)
      }
      await this.repository.save({
        ...user,
        userRoles: [...user.userRoles, { role_id: role.id }],
      });
      return dto;
    }
    throw new HttpException(MessageError.ROLE_OR_USER_NOT_FOUND, HttpStatus.NOT_FOUND)
  }

  async addBan(dto: BanUserDto): Promise<void> {
    const user: UserEntity = await this.findUserById(dto.userId);
    if (!user) {
      throw new HttpException(MessageError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await this.repository.save(user);
  }
}
