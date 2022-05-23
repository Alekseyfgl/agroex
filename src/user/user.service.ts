import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { UserEntity } from './user.entity';


@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository,
  ) {
  }


  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.createUser(createUserDto);
  }
}
