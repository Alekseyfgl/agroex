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
        return  await this.userRepository.createUser(createUserDto);
    }

    async getUserFromDB(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
        const user = await this.userRepository.checkUserByEmail(loginUserDto)
        const isPassword = await this.userRepository.checkPasswordFromEmail(loginUserDto)
        return user && isPassword ? user : null
    }
}
