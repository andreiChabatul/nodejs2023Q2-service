import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserAnswer, UserCreate } from 'src/types';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { checkId } from 'src/utils/checkId';
import { PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient()
@Injectable()
export class UserService {
  async getAllUsers(): Promise<UserAnswer[]> {
    const DPPassword = await prisma.user.findMany()
    DPPassword.map((user) => delete user.password);
    return DPPassword;
  }

  async getOneUser(id: string): Promise<UserAnswer> {
    // checkId(id, 'users');
    const user = await prisma.user.findUnique({
      where: { id },
    })
    // const user = tempDB.users.find((user) => user.id === id);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserAnswer> {
    // const newUser: UserCreate = {
    //   ...createUserDto,
    //   version: 1,
    //   createdAt: Date.now(),
    //   updatedAt: Date.now(),
    // };
    const newUser = await prisma.user.create({
      data: {
        ...createUserDto
      },
    })
    return newUser;
    // tempDB.users.push(newUser);
    // return newUser;
  }

  async updatePassword(
    id: string,
    updatePaswordDto: UpdatePasswordDto,
  ): Promise<UserAnswer> {
    checkId(id, 'users');
    const user = tempDB.users.find((user) => user.id === id);
    if (user.password === updatePaswordDto.oldPassword) {
      user.password = updatePaswordDto.newPassword;
      user.version++;
      user.updatedAt = new Date();
    } else {
      throw new HttpException('Old Password is wrong', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    checkId(id, 'users');
    const indexUser = tempDB.users.findIndex((user) => user.id === id);
    tempDB.users.splice(indexUser, 1);
  }
}
