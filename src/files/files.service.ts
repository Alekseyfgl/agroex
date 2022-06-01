import { Injectable } from '@nestjs/common';
import { FileElementResponse } from "./dto/file-response-element.response";
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './InterfacesAndTypes/mfile.class'
import {HOST_URL} from "../constans/constans";

@Injectable()
export class FilesService {

    async saveFiles(file: MFile): Promise<FileElementResponse> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd'); //форматирует дату по нужному шаблону
        const uploadFolder = `${path}/uploads/${dateFolder}`; // создаем путь для файла
        await ensureDir(uploadFolder);
        await writeFile(`${uploadFolder}/${file.originalname.replace(/\s/g, '')}`, file.buffer); // указываем путь куда мы cохраняем файл и буфер
        const res: FileElementResponse = {url: `${HOST_URL.LOCAL_HOST}/${dateFolder}/${file.originalname.replace(/\s/g, '')}`, name: file.originalname.replace(/\s/g, '')}

        return res;
    }

    //конвертируем файл
    async convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file)
            .webp()
            .toBuffer()
    }

    async getImgUrl(file: Express.Multer.File): Promise<FileElementResponse> {
        let saveFile: MFile;
        if (file.mimetype.includes('image')) {
            const buffer: Buffer = await this.convertToWebP(file.buffer);
            saveFile = new MFile({
                originalname: `${file.originalname.split('.')[0]}.webp`,
                buffer
            });
        }

        return this.saveFiles(saveFile);
    }
}
