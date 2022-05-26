import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';
import { Optional } from '../interfacesAndTypes/optional.interface';
import { MessageError } from '../constans/constans';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Optional<RolesEntity>> {
    if (await this.getRoleByValue(dto.value)) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: [MessageError.ROLE_IS_ALREADY_EXISTS],
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const role: RolesEntity = await this.roleRepository.save(dto);
    return role;
  }

  async getRoleByValue(value: string): Promise<Optional<RolesEntity>> {
    const role: RolesEntity = await this.roleRepository.findOne({
      where: { value },
    });
    return role;
  }
}
