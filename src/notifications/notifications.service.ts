import { Injectable } from '@nestjs/common';
import { mapLimit } from 'async';
import * as firebase from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { chunk } from 'lodash';
import * as _ from 'lodash';
import { NotificationsRepository } from './notifications.repository';
import { UpdateTokenDto } from './dto/updateToken.dto';
import { UserEntity } from '../user/user.entity';
import { FireBaseTokensEntity } from './fireBaseTokens.entity';
import { v4 as uuidv4 } from 'uuid';
import { notificationsMessages } from './notifications.mapper';

import {NOTIFICATIONS_LINKTO, NOTIFICATIONS_STATUS, NOTIFICATIONS_TYPES} from "../constans/constans";

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
  linkTo: NOTIFICATIONS_LINKTO;
  userIds: string;
  type: NOTIFICATIONS_TYPES;
  status: NOTIFICATIONS_STATUS
}

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async updateToken(
    currentUser: UserEntity,
    updateTokenDto: UpdateTokenDto,
  ): Promise<void> {
    return await this.notificationsRepository.updateToken(
      currentUser,
      updateTokenDto,
    );
  }

  async findTokens(userIds: number[]): Promise<FireBaseTokensEntity[]> {
    return this.notificationsRepository.findAllUserTokens(userIds);
  }

  async sendNotifications(
    userIds: number[],
    title: string,
    message: string,
    linkTo: string,
    type: NOTIFICATIONS_TYPES
  ): Promise<void> {
    const status:NOTIFICATIONS_STATUS = NOTIFICATIONS_STATUS.NEW;
    const uniqueUserIds: number[] =
      userIds.length > 1 ? _.uniq(userIds) : userIds;
    const tokens: FireBaseTokensEntity[] = await this.findTokens(uniqueUserIds);
    const firebaseMessages: ISendFirebaseMessages[] = tokens.map((token) =>
      notificationsMessages(
        token,
        message,
        title,
        linkTo,
        uniqueUserIds.toString(),
        type,
        status
      ),
    );
    const fireBaseResp: BatchResponse = await this.sendAll(firebaseMessages);
    console.log(fireBaseResp);
  }

  public async sendAll(
    firebaseMessages: ISendFirebaseMessages[],
    dryRun?: boolean,
  ): Promise<BatchResponse> {
    const batchedFirebaseMessages = chunk(firebaseMessages, 500); // firebase messages limit

    const batchResponses = await mapLimit<
      ISendFirebaseMessages[],
      BatchResponse
    >(
      batchedFirebaseMessages,
      process.env.FIREBASE_PARALLEL_LIMIT, // 3 is a good place to start - async limit
      async (
        groupedFirebaseMessages: ISendFirebaseMessages[],
      ): Promise<BatchResponse> => {
        try {
          const tokenMessages: firebase.messaging.TokenMessage[] =
            groupedFirebaseMessages.map(
              ({ message, title, token, linkTo, userIds , type, status}) => ({
                notification: { body: message, title },
                data: { linkTo, userIds, type, status, id: uuidv4()},
                token,
                apns: {
                  payload: {
                    aps: {
                      'content-available': 1,
                    },
                  },
                },
              }),
            );
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
      {
        responses: [],
        successCount: 0,
        failureCount: 0,
      } as unknown as BatchResponse,
    );
  }

  // sendMessage function is for future (maybe :) )
  public async sendMessage(
    token: string,
    message?: string,
    payload?: any,
  ): Promise<void | string> {
    try {
      return await firebase
        .messaging()
        .send({
          token,
          notification: {
            body: message,
          },
          data: payload,
        })
        .then((response) => {
          console.log('response after sending notification :>>', response);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
