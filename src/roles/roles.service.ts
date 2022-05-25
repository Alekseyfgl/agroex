import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";
import {RolesEntity} from "./roles.entity";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(RolesEntity)

        private readonly roleRepository: Repository<RolesEntity>
    ) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.save(dto)
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}})
        return role;
    }

}
