import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { MessageError } from '../../constans/constans';
import {ExpressRequestInterface} from "../../auth/interfacesAndTypes/expressRequest.interface";
import {ModerationStatus} from "../../advertisements/interface/interfacesAndTypes";

@Injectable()
export class ApprovedUserGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        const request: ExpressRequestInterface = context
            .switchToHttp()
            .getRequest<ExpressRequestInterface>();

        if (request.user.moderationStatus === ModerationStatus.APPROVED) {
            return true;
        }
        throw new HttpException(MessageError.USER_IS_NOT_APPROVED, HttpStatus.FORBIDDEN)
    }
}