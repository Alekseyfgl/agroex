import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard],
})
export class AuthModule {}
