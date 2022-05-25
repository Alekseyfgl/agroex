import {Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {CreateUserDto} from '../auth/dto/createUser.dto';
import {UserEntity} from './user.entity';
import {LoginUserDto} from "../auth/dto/loginUserDto";


@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.userRepository.createUser(createUserDto);
    }

    async getRegisteredUser(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
        const user: CreateUserDto = await this.userRepository.checkUserByEmail(loginUserDto)
        const isPassword: UserEntity = await this.userRepository.checkPasswordFromEmail(loginUserDto)
        return user && isPassword ? user : null
    }

    async getUserById(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.findUserById(user.id)
    }
}
