import {FireBaseTokensEntity} from "./fireBaseTokens.entity";
import {ISendFirebaseMessages} from "./notifications.service";

export const notificationsMessages = (
    tokens: FireBaseTokensEntity,
    message,
    title,
    linkTo,
    userIds
): ISendFirebaseMessages => ({
    token: tokens.token,
    message: message,
    title: title,
    linkTo: linkTo,
    userIds: userIds
})