import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageError } from '../constans/constans';

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
}
