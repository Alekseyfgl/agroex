import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decarator';
import { UserEntity } from '../user/user.entity';
import { NotificationsService } from './notifications.service';
import { UpdateTokenDto } from './dto/updateToken.dto';
import { FireBaseTokensEntity } from './fireBaseTokens.entity';
import { InsertResult, UpdateResult } from 'typeorm';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateToken(
    @User() currentUser: UserEntity,
    @Body() updateTokenDto: UpdateTokenDto,
  ): Promise<void> {
    return await this.notificationsService.updateToken(
      currentUser,
      updateTokenDto,
    );
  }
}
