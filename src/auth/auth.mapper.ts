import { UserEntity } from '../user/user.entity';
import { UserResponseInterface } from '../user/interfacesAndTypes/userResponse.interface';

export const userForResponse = (
  user: UserEntity,
  token: string,
): UserResponseInterface => ({
  user: {
    id: user.id,
    username: user.username,
    phone: user.phone,
    email: user.email,
    token: token,
    image: user.image,
    userRoles: user.userRoles,
    banned: user.banned,
    banReason: user.banReason,
    advertisements: user.advertisements,
    userBets: user.userBets,
  },
});
