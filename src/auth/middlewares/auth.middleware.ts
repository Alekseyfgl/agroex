import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '../interfacesAndTypes/expressRequest.interface';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

//декодируем токен и получаем текущеного пользователя до контроллера т.к. - мидлвары вызываются до контроллера
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(
    req: ExpressRequestInterface,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    //получаем токен из заголовка
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(' ')[1];
      try {
        const decodeUser: UserEntity = await this.validateToken(token);
        req.user = await this.userService.getUserById(decodeUser);
      } catch (e) {
        req.user = null;
      }
    }
    next();
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
