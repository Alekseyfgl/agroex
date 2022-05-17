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
      url: 'postgres://mhrpqbhtkrwpot:52af8c6c7ae1cc34bf031fff523146c871ec021fdf2cdd2c9bbd727b86fe13d3@ec2-52-30-67-143.eu-west-1.compute.amazonaws.com:5432/denneq89n3dfuq',

      extra: {
        ssl: {
          rejectUnauthorized: false,
          charset: 'utf8mb4_unicode_ci',
        },
      },
      // url: 'postgres://postgres:root@localhost:5432/categories',
      // host: process.env.POSTGRES_HOST,
      // port: Number(process.env.POSTGRES_PORT),
      // username: 'postgres',
      // database: process.env.POSTGRES_DB,
      // password: 'ec2-52-30-67-143.eu-west-1.compute.amazonaws.com',
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
  url: 'postgres://mhrpqbhtkrwpot:52af8c6c7ae1cc34bf031fff523146c871ec021fdf2cdd2c9bbd727b86fe13d3@ec2-52-30-67-143.eu-west-1.compute.amazonaws.com:5432/denneq89n3dfuq',
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

