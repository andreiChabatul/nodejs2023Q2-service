import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private userServise: UserService) {}

  @Get()
  async getAll() {
    return this.userServise.getAllUsers();
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userServise.getOneUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userServise.createUser(createUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userServise.deleteUser(id);
  }

  @Put(':id')
  async updatePasword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userServise.updatePassword(id, updatePasswordDto);
  }
}
