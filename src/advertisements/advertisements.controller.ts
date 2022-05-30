import { Controller, Get} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';


@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Get()
  findAll() {
    return this.advertisementsService.findAll();
  }




}
