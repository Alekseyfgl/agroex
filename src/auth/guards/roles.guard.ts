import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../roles/decorators/roles-auth.decorator';
import { MessageError } from '../../constans/constans';
import { ExpressRequestInterface } from '../interfacesAndTypes/expressRequest.interface';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles: string[] = this.reflector.getAllAndOverride<
        string[]
      >(ROLES_KEY, [context.getHandler(), context.getClass()]);
      if (!requiredRoles) {
        return true;
      }
      const req: ExpressRequestInterface = context.switchToHttp().getRequest();
      const token: string = req.headers.authorization.split(' ')[1];
      const user: UserEntity = await this.validateToken(token);
      req.user = user;
      return user.userRoles.some((role) =>
        requiredRoles.includes(role.role_id.toString()),
      );
    } catch (e) {
      throw new HttpException(MessageError.ACCESS_DENIED, HttpStatus.FORBIDDEN)
    }
  }

  validateToken(token: string): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET, (error, decoded: UserEntity) => {
        if (error) return reject(error);

        resolve(decoded);
      });
    });
  }
}
