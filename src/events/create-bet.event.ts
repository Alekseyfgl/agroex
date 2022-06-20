import { UserEntity } from '../user/user.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';
import { CreateBetDto } from '../bets/dto/createBet.dto';

export class CreateBetEvent {
    constructor(
        public readonly user: UserEntity,
        public readonly bet: CreateBetDto,
        public readonly advertisement: AdvertisementsEntity,
    ) {}
}