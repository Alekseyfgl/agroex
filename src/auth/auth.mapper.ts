import { UserEntity } from '../user/user.entity';
import { UserResponseWithTokenInterface } from '../user/interfacesAndTypes/userResponse.interface';

export const userForResponse = (
  user: UserEntity,
  token: string,
): UserResponseWithTokenInterface => ({
  user: {
    id: user.id,
    uuid: user.uuid,
    type: user.type,
    name: user.name,
    surname: user.surname,
    companyName: user.companyName,
    companyTaxNumber: user.companyTaxNumber,
    bankAccount: user.bankAccount,
    certificateImage: user.certificateImage,
    phone: user.phone,
    email: user.email,
    token: token,
    image: user.image,
    userRoles: user.userRoles,
    banned: user.banned,
    banReason: user.banReason,
    moderationStatus: user.moderationStatus,
    moderationComment: user.moderationComment,
    advertisements: user.advertisements,
    userBets: user.userBets,
  },
});
