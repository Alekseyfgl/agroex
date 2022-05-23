import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from '../user/user.entity';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './interfacesAndTypes/userResponse.interface';


@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {
  }


  async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }


  generateJwt(user: UserEntity): string {
    return sign({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }, process.env.JWT_SECRET);
  }

  buildUserResponseWithToken(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
