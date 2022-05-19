import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,

      extra: {
        ssl: {
          rejectUnauthorized: false,
          charset: 'utf8mb4_unicode_ci',
        },
      },
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../database/migrations',
      },
      synchronize: false,
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  extra: {
    ssl: {
      rejectUnauthorized: false,
      charset: 'utf8mb4_unicode_ci',
    },
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
  synchronize: false,
  logging: true,
};