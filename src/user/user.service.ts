import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAnswer } from 'src/types';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrorNoFound } from 'src/utils/errorHandling';
import { prisma } from 'src/main';

@Injectable()
export class UserService {
  async getAllUsers(): Promise<UserAnswer[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async getOneUser(id: string): Promise<UserAnswer> {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id }
    }).catch(() => ErrorNoFound('users'));
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserAnswer> {
    const newUser = await prisma.user.create({
      data: {
        ...createUserDto
      },
    })
    return newUser;
  }

  async updatePassword(
    id: string,
    updatePaswordDto: UpdatePasswordDto,
  ): Promise<UserAnswer> {
    const user = await this.getOneUser(id);

    if (user.password === updatePaswordDto.oldPassword) {
      prisma.user.update({
        where: { id },
        data: {
          password: updatePaswordDto.newPassword,
          version: user.version++,
          updatedAt: new Date()
        }
      }
      )
    }
    else {
      throw new HttpException('Old Password is wrong', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    }).catch(() => ErrorNoFound('users'));
  }
}
