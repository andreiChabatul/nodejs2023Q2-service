import { HttpStatus, Injectable, HttpException } from "@nestjs/common";


@Injectable()
export class ExceptionFilter extends Error {
    status: HttpStatus;
    errors;

    constructor(status: HttpStatus, message: string, errors?) {
        super(message);
        this.status = status;
        this.errors = errors;

    }

    static UnauthorizedError() {
        return new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED,)
    }



}