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
import { AlbumService } from './album.service';
import { CreateAlbumtDto } from './dto/create-album.dto';
import { UpdateAlbumtDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAll() {
    return this.albumService.getAllAlbum();
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.getOneAlbum(id);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumtDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.deleteAlbum(id);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumtDto: UpdateAlbumtDto,
  ) {
    return await this.albumService.updateAlbum(id, updateAlbumtDto);
  }
}
