import { Injectable } from '@nestjs/common';
import { mapLimit } from 'async';
import * as firebase from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { chunk } from 'lodash';
import {NotificationsRepository} from "./notifications.repository";
import {UpdateTokenDto} from "./dto/updateToken.dto";
import {UserEntity} from "../user/user.entity";
import {FireBaseTokensEntity} from "./fireBaseTokens.entity";
import {InsertResult, UpdateResult} from "typeorm";
import {notificationsMessages} from "./notifications.mapper";

export interface ISendFirebaseMessages {
    token: string;
    title?: string;
    message: string;
}

@Injectable()
export class NotificationsService {
    constructor(private readonly notificationsRepository: NotificationsRepository) {}
    async updateToken(currentUser: UserEntity, updateTokenDto: UpdateTokenDto): Promise<InsertResult>  {
        return await this.notificationsRepository.updateToken(currentUser, updateTokenDto)
    }

    async findTokens(userIds: number[]): Promise<FireBaseTokensEntity[]> {
        return this.notificationsRepository.findAllUserTokens(userIds)
    }

    async sendNotifications(userIds: number[], title: string, message:string): Promise<void> {
        const tokens: FireBaseTokensEntity[] = await this.findTokens(userIds)
        const firebaseMessages: ISendFirebaseMessages[] = tokens.map(token => notificationsMessages(token, message, title))
        const fireBaseResp: BatchResponse = await this.sendAll(firebaseMessages)
        console.log(fireBaseResp)
    }

    public async sendAll(firebaseMessages: ISendFirebaseMessages[], dryRun?: boolean): Promise<BatchResponse> {
        const batchedFirebaseMessages = chunk(firebaseMessages, 500); // firebase messages limit

        const batchResponses = await mapLimit<ISendFirebaseMessages[], BatchResponse>(
            batchedFirebaseMessages,
            process.env.FIREBASE_PARALLEL_LIMIT, // 3 is a good place to start - async limit
            async (groupedFirebaseMessages: ISendFirebaseMessages[]): Promise<BatchResponse> => {
                try {
                    const tokenMessages: firebase.messaging.TokenMessage[] = groupedFirebaseMessages.map(({ message, title, token }) => ({
                        notification: { body: message, title },
                        token,
                        apns: {
                            payload: {
                                aps: {
                                    'content-available': 1,
                                },
                            },
                        },
                    }));
                    return firebase.messaging().sendAll(tokenMessages, dryRun);
                } catch (error) {
                    return {
                        responses: groupedFirebaseMessages.map(() => ({
                            success: false,
                            error,
                        })),
                        successCount: 0,
                        failureCount: groupedFirebaseMessages.length,
                    };
                }
            },
        );

        return batchResponses.reduce(
            ({ responses, successCount, failureCount }, currentResponse) => {
                return {
                    responses: responses.concat(currentResponse.responses),
                    successCount: successCount + currentResponse.successCount,
                    failureCount: failureCount + currentResponse.failureCount,
                };
            },
            ({
                responses: [],
                successCount: 0,
                failureCount: 0,
            } as unknown) as BatchResponse,
        );
    }

    // sendMessage function is for future (maybe :) )
    public async sendMessage(token: string, message?: string, payload?: any): Promise<void | string> {
        try {
            return await firebase.messaging().send({
                token,
                notification: {
                    body: message,
                },
                data: payload,
            }).then((response) => {
                console.log("response after sending notification :>>", response)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
