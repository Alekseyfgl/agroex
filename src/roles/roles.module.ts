import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { UserEntity } from '../user/user.entity';
import { UserRolesEntity } from './user-roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesEntity, UserEntity, UserRolesEntity]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
