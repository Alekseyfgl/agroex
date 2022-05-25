import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...userRoles: string[]) => SetMetadata(ROLES_KEY, userRoles);
