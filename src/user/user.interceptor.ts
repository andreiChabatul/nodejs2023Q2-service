import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAnswer, UserCreate } from 'src/types';
@Injectable()
export class TransformDate implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(map((value: UserAnswer) =>
            ({
                ...value,
                updatedAt: value.updatedAt.getTime(),
                createdAt: value.createdAt.getTime(),
            })))

    }
}

