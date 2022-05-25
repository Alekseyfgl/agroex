import {AbstractRepository, EntityRepository} from 'typeorm';
import {UserEntity} from './user.entity';
import {CreateUserDto} from '../auth/dto/createUser.dto';
import {HttpException, HttpStatus} from '@nestjs/common';
import {MessageError, ROLES_ID} from '../constans/constans';
import {LoginUserDto} from "../auth/dto/loginUserDto";
import {compare} from 'bcrypt';
import {RolesEntity} from "../roles/roles.entity";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

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

        newUser.userRoles = [{ role_id: +ROLES_ID.ADMIN }]; // по умолчанию добавляем роль юзер

        return await this.repository.save(newUser);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return await this.repository.findOne({
            where: {
                email: email,
            },
            relations: ['userRoles'],
        });
    }

    async checkPasswordFromEmail(loginUserDto: LoginUserDto) {
        const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
        const isPassword: boolean = await compare(
            loginUserDto.password,
            user.password
        )


        if (!isPassword) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: [MessageError.WRONG_PASSWORD_TRY_AGAIN],
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
        return user
    }

    async checkUserByEmail(loginUserDto: LoginUserDto): Promise<CreateUserDto> {
        const user: UserEntity = await this.getUserByEmail(loginUserDto.email);
        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: [MessageError.EMAIL_NOT_FOUND],
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
        return user
    }

    async findUserById(id: number): Promise<UserEntity> {
        const user: UserEntity = await this.repository.findOne({
            where: { id: id },
            relations: ['userRoles'],
        });

        if(!user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: [MessageError.USER_ID_NOT_FOUND],
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
        return user
    }

    async addRole(dto: AddRoleDto, role: RolesEntity) {
        const user = await this.findUserById(dto.userId);

        if (role && user) {
            if (user.userRoles.some((userRole) => [role.id].includes(userRole.role_id))) {
                throw new HttpException('Пользователь уже обладает данной ролью', HttpStatus.NOT_FOUND);
            }
            user.userRoles.push({role_id: role.id})
            await this.repository.save(user);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async addBan(dto: BanUserDto) {
        const user = await this.findUserById(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await this.repository.save(user);
        return user;
    }

}
