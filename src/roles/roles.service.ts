import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';
import { Optional } from '../interfacesAndTypes/optional.interface';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}

  async getRoleByValue(value: string): Promise<Optional<RolesEntity>> {
    const role: RolesEntity = await this.roleRepository.findOne({
      where: { value },
    });
    return role;
  }
}
