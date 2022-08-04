import {AbstractRepository, EntityRepository, getRepository, SelectQueryBuilder} from 'typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';

@EntityRepository(OrdersEntity)
export class OrdersRepository extends AbstractRepository<OrdersEntity> {
  async confirmBet(advert: AdvertisementsEntity): Promise<void> {
    const currentBetId: number = advert.userBets[0].id;

    await this.repository.query(`
            INSERT INTO orders (bet_id) VALUES (${currentBetId});
            UPDATE advertisements SET "isConfirmed"=true , "isActive"=false WHERE id = ${advert.id}`);
  }

}
