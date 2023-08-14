import { Injectable } from '@nestjs/common';
import { Album } from 'src/types';
import { CreateAlbumtDto } from './dto/create-album.dto';
import { UpdateAlbumtDto } from './dto/update-album.dto';
import { ErrorNoFound } from 'src/utils/errorHandling';
import { prisma } from 'src/main';

@Injectable()
export class AlbumService {
  async getAllAlbum(): Promise<Album[]> {
    return prisma.album.findMany();
  }

  async getOneAlbum(id: string): Promise<Album> {
    const album = await prisma.album.findUniqueOrThrow({
      where: { id }
    }).catch(() => ErrorNoFound('albums'));
    return album;
  }

  async createAlbum(createAlbumtDto: CreateAlbumtDto): Promise<Album> {
    const newAlbum = await prisma.album.create({
      data: {
        ...createAlbumtDto
      },
    })
    return newAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    await prisma.album.delete({
      where: { id }
    }).catch(() => ErrorNoFound('albums'));
    await prisma.track.updateMany(
      {
        where: { albumId: id },
        data: { albumId: null }
      }
    )
  }

  async updateAlbum(
    id: string,
    updateAlbumtDto: UpdateAlbumtDto,
  ): Promise<Album> {
    const updateAlbum = await prisma.album.update({
      where: { id },
      data: updateAlbumtDto
    }).catch(() => ErrorNoFound('albums'));

    return updateAlbum;
  }
}
