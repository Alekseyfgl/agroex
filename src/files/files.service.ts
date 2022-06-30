import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { MFile } from './InterfacesAndTypes/mfile.class';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';
import { MessageError } from '../constans/constans';


@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async saveFiles(file: MFile): Promise<UploadApiResponse> {
    //: Promise<FileElementResponse> {
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new HttpException(MessageError.ERROR_WHILE_SAVING_ON_CLOUDINARY, HttpStatus.NOT_ACCEPTABLE)
    });

    // для локального сохранения:
    // const dateFolder = format(new Date(), 'yyyy-MM-dd'); //форматирует дату по нужному шаблону
    // const uploadFolder = `${path}/uploads/${dateFolder}`; // создаем путь для файла
    // await ensureDir(uploadFolder);
    // await writeFile(`${uploadFolder}/${file.originalname.replace(/\s/g, '')}`, file.buffer); // указываем путь куда мы cохраняем файл и буфер
    // const res: FileElementResponse = {url: `${HOST_URL.TEST_HOST}/static/${dateFolder}/${file.originalname.replace(/\s/g, '')}`, name: file.originalname.replace(/\s/g, '')}

    // return res;
  }

  //конвертируем файл
  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }

  async getSavedImgData(file: MFile) {
    let saveFile: MFile;

    const buffer: Buffer = await this.convertToWebP(file.buffer);
    saveFile = new MFile({
      originalname: `${file.originalname.split('.')[0]}.webp`,
      buffer,
    });

    return this.saveFiles(saveFile);
  }
}
