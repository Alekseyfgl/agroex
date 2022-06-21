import {fireBaseTokensEntity} from "./fireBaseTokens.entity";
import {ISendFirebaseMessages} from "./notifications.service";

export const notificationsMessages = (
    tokens: fireBaseTokensEntity,
    message,
    title
): ISendFirebaseMessages => ({
    token: tokens.token,
    message: message,
    title: title
})