import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpService, HttpStatus} from "@nestjs/common";
import { Response } from "express";
import {INTERNAL_SERVER_ERROR} from "../constans/constans";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const response: Response = context.getResponse<Response>();
        const status: HttpStatus = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionMessage: string | HttpException["response"] = exception instanceof HttpException
            ? exception.getResponse()
            : INTERNAL_SERVER_ERROR;

        const arrMessage: string[] = Array.isArray(exceptionMessage.message) ?  exceptionMessage.message : [exceptionMessage]

        response
            .status(status)
            .json({
                status: status,
                message: arrMessage,
            });
    }
}
