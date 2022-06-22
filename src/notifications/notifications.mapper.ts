import {FireBaseTokensEntity} from "./fireBaseTokens.entity";
import {ISendFirebaseMessages} from "./notifications.service";

export const notificationsMessages = (
    tokens: FireBaseTokensEntity,
    message,
    title
): ISendFirebaseMessages => ({
    token: tokens.token,
    message: message,
    title: title
})