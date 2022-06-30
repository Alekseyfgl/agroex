import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { roleName } from '../../roles/types/types';

export class AddRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty()
  readonly roleName: roleName;
  @IsNumber({}, { message: 'Должно быть числом' })
  @IsNotEmpty()
  readonly userId: number;
}
