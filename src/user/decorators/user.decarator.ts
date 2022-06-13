import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from '../../auth/interfacesAndTypes/expressRequest.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request: ExpressRequestInterface = ctx
    .switchToHttp()
    .getRequest<ExpressRequestInterface>();
  //проверяем есть ли пользователь в запросе
  if (!request.user) {
    return null;
  }
  // console.log(data)
  if (data) {
    // data - это то что мы передали @User() user: UserEntity или  @User('id')
    return request.user[data];
  }
  return request.user; // если условия не выполнились то хотим вернуть всего пользователя
});
