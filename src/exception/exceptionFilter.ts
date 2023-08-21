import { HttpStatus, Injectable } from "@nestjs/common";

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
        return new ExceptionFilter(HttpStatus.UNAUTHORIZED, 'Пользователь не авторизован')
    }



}