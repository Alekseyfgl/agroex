import {Module} from '@nestjs/common';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CategoriesModule} from "./categories/categories.module";
import {TypeOrmModule} from '@nestjs/typeorm'
import {ConfigModule} from "@nestjs/config";



@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, envFilePath: `.${process.env.NODE_ENV}.env`}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            cli: {
                migrationsDir: 'src/migrations',
            }
        }),
        CategoriesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

