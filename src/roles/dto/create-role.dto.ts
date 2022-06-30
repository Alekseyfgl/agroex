import { roleName } from '../types/types';

export class CreateRoleDto {
  readonly roleName: roleName;
  readonly description: string;
}
