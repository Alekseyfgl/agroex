import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { MFile } from './InterfacesAndTypes/mfile.class';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { MessageError } from '../constans/constans';
//import { path } from 'app-root-path';
//import { FileElementResponse } from "./dto/file-response-element.response";
//import { format } from 'date-fns';
//import { ensureDir, writeFile } from 'fs-extra';
//import {HOST_URL} from "../constans/constans";

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async saveFiles(
    file: MFile,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    //: Promise<FileElementResponse> {
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException({
        status: HttpStatus.NOT_ACCEPTABLE,
        message: [MessageError.ERROR_WHILE_SAVING_ON_CLOUDINARY],
      });
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
