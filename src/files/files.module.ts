import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import { path } from 'app-root-path'

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: `${path}/uploads`,
    serveRoot: '/static'
  })],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
