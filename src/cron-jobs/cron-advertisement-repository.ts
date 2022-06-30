import { AbstractRepository, EntityRepository } from 'typeorm';
import { AdvertisementsEntity } from '../advertisements/advertisements.entity';

@EntityRepository(AdvertisementsEntity)
export class CronAdvertisementRepository extends AbstractRepository<AdvertisementsEntity> {
  async updateColumnIsActive(adId: number): Promise<void> {
    await this.repository.update(
      {
        id: adId,
        isActive: true,
      },
      {
        isActive: false,
      },
    );
  }
}
