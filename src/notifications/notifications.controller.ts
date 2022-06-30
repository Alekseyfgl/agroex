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
import {ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";

@ApiTags('notifications')
@ApiSecurity('JWT-auth')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({summary: 'Update registration token'})
  @ApiResponse({status: 201})
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
