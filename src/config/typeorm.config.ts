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
      // host: process.env.POSTGRES_HOST,
      // port: Number(process.env.POSTGRES_PORT),
      // username: process.env.POSTGRES_USERNAME,
      // database: process.env.POSTGRES_DB,
      // password: process.env.POSTGRES_PASSWORD,
      url: process.env.DATABASE_URL,

      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
        charset: 'utf8mb4_unicode_ci',
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
  // host: process.env.POSTGRES_HOST,
  // port: Number(process.env.POSTGRES_PORT),
  // username: process.env.POSTGRES_USERNAME,
  // database: process.env.POSTGRES_DB,
  // password: process.env.POSTGRES_PASSWORD,
  url: process.env.DATABASE_URL,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
    charset: 'utf8mb4_unicode_ci',
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
  synchronize: false,
  logging: true,
};
