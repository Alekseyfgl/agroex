import { Injectable } from '@nestjs/common';
import {AdvertisementsRepository} from "./advertisements.repository";


@Injectable()
export class AdvertisementsService {

  constructor(private readonly advertisementsRepository: AdvertisementsRepository) {
  }

 async findAll() {
    return await this.advertisementsRepository.findAll();
  }


}
