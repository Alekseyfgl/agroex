import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...userRoles: string[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, userRoles);
