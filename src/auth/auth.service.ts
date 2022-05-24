import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {CreateUserDto} from './dto/createUser.dto';
import {UserEntity} from '../user/user.entity';
import {sign} from 'jsonwebtoken';
import {expiresInForToken} from '../constans/constans';
import {userForResponse} from './auth.mapper';
import {LoginUserDto} from "./dto/loginUserDto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.createUser(createUserDto);
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
        return await this.userService.getUserFromDB(loginUserDto)
    }

    private static generateJwt(user: UserEntity): string {
        return sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {expiresIn: expiresInForToken},
        );
    }

    public buildUserResponseWithToken(user): ReturnType<typeof userForResponse> {
        const token: string = AuthService.generateJwt(user);
        return userForResponse(user, token);
    }

}
