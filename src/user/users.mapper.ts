import {UserEntity} from "./user.entity";
import {User} from "./interfacesAndTypes/user.type";

export const usersForResponse = (
    user: UserEntity,
): User => ({
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
        image: user.image,
        userRoles: user.userRoles,
        banned: user.banned,
        banReason: user.banReason,
        moderationStatus: user.moderationStatus,
        moderationComment: user.moderationComment,
});