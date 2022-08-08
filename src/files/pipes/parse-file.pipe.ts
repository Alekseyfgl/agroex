import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FILES_ERRORS } from '../../constans/constans';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(
    files: Express.Multer.File,
    metadata: ArgumentMetadata,
  ): Express.Multer.File {
    console.log('filePipe: ' + files)
    if (files === undefined || files === null ) {
      throw new HttpException(FILES_ERRORS.FILE_EXPECTED, HttpStatus.NOT_FOUND)
    }

    return files;
  }
}

export class ParseFiles implements PipeTransform {
  transform(
      files: Array<Express.Multer.File>,
      metadata: ArgumentMetadata,
  ): Express.Multer.File[] {
    console.log('filesPipe: ' + files)

    console.log('filesPipe: isArray' + Array.isArray(files))

    if (files.length === 0) {
      throw new HttpException(FILES_ERRORS.FILE_EXPECTED, HttpStatus.NOT_FOUND)
    }

    return files;
  }
}
