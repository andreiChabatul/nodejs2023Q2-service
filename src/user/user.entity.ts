import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: Date | number;
  updatedAt: Date | number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}