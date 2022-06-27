import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersRepository } from './orders.repository';
import { BetModule } from '../bets/bet.module';
import { AdvertisementsModule } from '../advertisements/advertisements.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    BetModule,
    AdvertisementsModule,
    NotificationsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
