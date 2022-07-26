import { UserEntity } from '../user/user.entity';
import { UserResponseInterface } from '../user/interfacesAndTypes/userResponse.interface';
import {userType} from "../user/interfacesAndTypes/user.type";

export const userForResponse = (
  user: UserEntity,
  token: string,
): UserResponseInterface => ({
  user: {
    id: user.id,
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
    advertisements: user.advertisements,
    userBets: user.userBets,
  },
});
