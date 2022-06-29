import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestInterface } from '../interfacesAndTypes/expressRequest.interface';
import { MessageError } from '../../constans/constans';

Injectable();

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: ExpressRequestInterface = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    if (request.user) {
      return true; // если true, то мы можем попасть в наш контроллер
    }
    throw new HttpException(MessageError.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED)
  }
}
