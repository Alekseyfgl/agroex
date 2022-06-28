import {
  AbstractRepository,
  EntityRepository,
  In,
} from 'typeorm';
import { FireBaseTokensEntity } from './fireBaseTokens.entity';
import { UserEntity } from '../user/user.entity';
import { UpdateTokenDto } from './dto/updateToken.dto';
import { FireBaseTokenSaving } from './interfacesAndTypes/interfacesAndTypes';
import * as moment from 'moment';

@EntityRepository(FireBaseTokensEntity)
export class NotificationsRepository extends AbstractRepository<FireBaseTokensEntity> {
  async updateToken(
    user: UserEntity,
    updateTokenDto: UpdateTokenDto,
  ): Promise<void> {
    const dataToSave: FireBaseTokenSaving = {
      userId: user.id,
      deviceType: updateTokenDto.deviceType,
      token: updateTokenDto.token,
      isAllowed: updateTokenDto.isAllowed,
    };

    await this.repository
      .createQueryBuilder()
      .insert()
      .into('fireBaseTokens')
      .values(dataToSave)
      .onConflict(
        `("userId", "deviceType") DO UPDATE SET "token" = :token, "updatedAt" = :dateNow`,
      )
      .setParameter('token', updateTokenDto.token)
      .setParameter('dateNow', moment().format())
      .execute();
  }

  async findAllUserTokens(userIds: number[]): Promise<FireBaseTokensEntity[]> {
    return this.repository.find({
      select: ['token'],
      where: {
        userId: In([...userIds]), //предположим нужно одно сообщение на несколько юзеров
      },
    });
  }
}
