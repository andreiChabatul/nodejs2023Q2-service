import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserAnswer } from 'src/types';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Injectable()
export class UserService {

    async getAllUsers(): Promise<UserAnswer[]> {
        const DPPassword = [...tempDB.users];
        DPPassword.map((user) => delete user.password)
        return DPPassword;
    }

    async getOneUser(id: string): Promise<UserAnswer> {
        this.checkId(id);
        const user = tempDB.users.find(user => user.id === id);
        const answerUser = { ...user };
        delete answerUser.password
        return answerUser;
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser: User = {
            ...createUserDto,
            version: 1,
            id: uuidv4(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        tempDB.users.push(newUser);
        const answerUser = { ...newUser };
        delete answerUser.password
        return answerUser;
    }

    async updatePassword(id: string, updatePaswordDto: UpdatePasswordDto) {
        this.checkId(id);
        const user = tempDB.users.find(user => user.id === id);
        if (user.password === updatePaswordDto.oldPassword) {
            user.password = updatePaswordDto.newPassword;
            user.version ++;
            user.updatedAt = Date.now();
        } else {
            throw new HttpException('Old Password is wrong', HttpStatus.FORBIDDEN);
        }
        const answerUser = { ...user };
        delete answerUser.password
        return answerUser;
    }

    async deleteUser(id: string) {
        this.checkId(id);
        const indexUser = tempDB.users.findIndex((user) => user.id === id);
        tempDB.users.splice(indexUser, 1);

    }

    private checkId(id: string): void {
        let isUser = true;
        tempDB.users.map((user) => user.id === id ? isUser = false : '');
        if (isUser) throw new HttpException('User id does not exist', HttpStatus.NOT_FOUND);
    }
}
