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
    if (files === undefined || files === null) {
      throw new HttpException(FILES_ERRORS.FILE_EXPECTED, HttpStatus.NOT_FOUND)
    }
    return files;
  }
}
