import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userServise: UserService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    const users = await this.userServise.getAllUsers();
    return users.map(user => new UserEntity(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(await this.userServise.getOneUser(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.userServise.createUser(createUserDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userServise.deleteUser(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updatePasword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return new UserEntity(await this.userServise.updatePassword(id, updatePasswordDto));
  }
}
