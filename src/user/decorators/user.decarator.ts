import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from '../../types/expressRequest.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

  //проверяем есть ли пользователь в запросе
  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }
  return request.user;
});
