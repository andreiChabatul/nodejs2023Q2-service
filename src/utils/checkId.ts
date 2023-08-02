import { HttpException, HttpStatus } from '@nestjs/common';
import { tempDB } from 'src/tempBD/storage';
import { Album, Artist, Track, User, typeField } from 'src/types';

export const checkId = (id: string, type: typeField): void => {
  let isUser = true;
  tempDB[type].map((item: Album | User | Artist | Track) =>
    item.id === id ? (isUser = false) : '',
  );
  if (isUser)
    throw new HttpException(`${type} id does not exist`, HttpStatus.NOT_FOUND);
};
