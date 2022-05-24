import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from '../user/user.entity';
import { sign } from 'jsonwebtoken';
import { expiresInForToken } from '../constans/constans';
import { userToRegistration } from './auth.mapper';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  private static generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: expiresInForToken },
    );
  }

  public buildUserResponseWithToken(
    user: UserEntity,
  ): ReturnType<typeof userToRegistration> {
    const token: string = AuthService.generateJwt(user);
    return userToRegistration(user, token);
  }
}
