import { HttpException, HttpStatus } from '@nestjs/common';
import { typeField } from 'src/types';

export const ErrorNoFound = (type: typeField) => {
  throw new HttpException(`${type} id does not exist`, HttpStatus.NOT_FOUND);
}

export const ErrorNoFavorities = (type: typeField) => {
  throw new HttpException(`${type} id does not exist`, HttpStatus.UNPROCESSABLE_ENTITY);
}

export const ErrorLogin = (message: string) => {
  throw new HttpException(message, HttpStatus.FORBIDDEN);
}