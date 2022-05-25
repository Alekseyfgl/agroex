import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageError } from '../constans/constans';
import { LoginUserDto } from '../auth/dto/loginUserDto';
import { compare } from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends AbstractRepository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: [MessageError.EMAIL_IS_TAKEN],
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser: UserEntity = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.repository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        email: email,
      },
    });
  }

  async checkPasswordFromEmail(loginUserDto: LoginUserDto) {
    const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
    const isPassword: boolean = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: [MessageError.WRONG_PASSWORD_TRY_AGAIN],
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }

  async checkUserByEmail(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
    const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
    console.log(user);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: [MessageError.EMAIL_NOT_FOUND],
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: [MessageError.USER_ID_NOT_FOUND],
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }
}
