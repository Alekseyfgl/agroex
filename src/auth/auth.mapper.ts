import { UserEntity } from '../user/user.entity';
import { UserResponseInterface } from './interfacesAndTypes/userResponse.interface';

export const userToRegistration = (
  user: UserEntity,
  token: string,
): UserResponseInterface => ({
  user: {
    ...user,
    token: token,
  },
});
