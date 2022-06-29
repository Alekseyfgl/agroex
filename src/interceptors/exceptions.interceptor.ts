import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler, HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    if (!Array.isArray(err.response.message)) {
                        console.log(err)
                        throw new HttpException(
                            {
                                status: err.status,
                                message: [err.response],
                            },
                            err.status,
                        );
                    }

                    throw new HttpException(
                        {
                            status: err.status,
                            message: err.response.message,
                        },
                        err.status,
                    );
                }),
            );
    }
}
