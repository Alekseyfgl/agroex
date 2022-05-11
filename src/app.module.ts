import {Module} from '@nestjs/common';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CategoriesModule} from "./categories/categories.module";
import {TypeOrmModule} from '@nestjs/typeorm'
import {ConfigModule} from "@nestjs/config";
import {typeOrmAsyncConfig} from "./config/typeorm.config";
import { EventEmitterModule } from '@nestjs/event-emitter';



@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        EventEmitterModule.forRoot(),
        CategoriesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})


export class AppModule {
}



