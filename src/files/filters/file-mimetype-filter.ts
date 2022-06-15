import { UnsupportedMediaTypeException } from '@nestjs/common';
import { FILES_ERRORS } from '../../constans/constans';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `${FILES_ERRORS.FILE_TYPE_IS_NOT_MATCHING}: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}
