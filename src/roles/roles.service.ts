import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';
import { PromiseOptional } from '../interfacesAndTypes/optional.interface';
import { roleName } from './types/types';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}

  async getRoleByValue(roleName: roleName): PromiseOptional<RolesEntity> {
    const role: RolesEntity = await this.roleRepository.findOne({
      where: { roleName },
    });
    return role;
  }
}
