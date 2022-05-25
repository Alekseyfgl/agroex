export const numToEncode = 10;

export const expiresInForToken = '168h';

export enum ORDER_CATEGORIES {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum ROLES_ID {
    USER = '1',
    ADMIN = '2',
    MODERATOR = '3',
}

export const enum MessageError {
    EMAIL_IS_TAKEN = 'This email is already taken',
    EMAIL_NOT_FOUND = 'Email not found',
    WRONG_PASSWORD_TRY_AGAIN= 'Wrong password try again',
    USER_ID_NOT_FOUND = 'User with this id not found',
    NOT_AUTHORIZED = 'Not authorized',
}
