import {AbstractRepository, EntityRepository, In, UpdateResult} from 'typeorm';
import {fireBaseTokensEntity} from "./fireBaseTokens.entity";
import {UserEntity} from "../user/user.entity";
import {UpdateTokenDto} from "./dto/updateToken.dto";
import {DeviceTypes} from "./interfacesAndTypes/interfacesAndTypes";

@EntityRepository(fireBaseTokensEntity)
export class NotificationsRepository extends AbstractRepository<fireBaseTokensEntity> {
    async updateToken(user: UserEntity, updateTokenDto: UpdateTokenDto): Promise<fireBaseTokensEntity | UpdateResult> {
        if (await this.findOne(user, updateTokenDto.deviceType)) {
            return await this.repository.update({
                userId: user.id,
                deviceType: updateTokenDto.deviceType
            }, {
                token: updateTokenDto.token
            })
        }

        return await this.repository.save({
            userId: user.id,
            deviceType: updateTokenDto.deviceType,
            token: updateTokenDto.token,
            isAllowed: updateTokenDto.isAllowed
        })
    }

    async findOne(user: UserEntity, deviceType?: DeviceTypes): Promise<fireBaseTokensEntity> {
        return await this.repository.findOne({
            where: {
                userId: user.id,
                deviceType: deviceType
            },
        });
    }

    async findAllUserTokens(userIds: number[]): Promise<fireBaseTokensEntity[]> {
        return await this.repository.find({
            select: ["token"],
            where: {
                userId: In([...userIds]), //предположим нужно одно сообщение на несколько юзеров
            }
        });
    }
}
