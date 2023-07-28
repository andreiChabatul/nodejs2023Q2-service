import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Album } from 'src/types';
import { CreateAlbumtDto } from './dto/create-album.dto';
import { UpdateAlbumtDto } from './dto/update-album.dto';
import { deleteFavorite } from 'src/utils/deleteFavorite';
import { checkId } from 'src/utils/checkId';

@Injectable()
export class AlbumService {
  async getAllAlbum(): Promise<Album[]> {
    return tempDB.albums;
  }

  async getOneAlbum(id: string): Promise<Album> {
    checkId(id, 'albums');
    return tempDB.albums.find((album) => album.id === id);
  }

  async createAlbum(createAlbumtDto: CreateAlbumtDto): Promise<Album> {
    const newAlbum: Album = {
      ...createAlbumtDto,
      id: uuidv4(),
    };
    tempDB.albums.push(newAlbum);
    return newAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    checkId(id, 'albums');
    const indexAlbum = tempDB.albums.findIndex((album) => album.id === id);
    tempDB.albums.splice(indexAlbum, 1);
    tempDB.tracks.map((track) =>
      track.albumId === id ? (track.albumId = null) : '',
    );
    deleteFavorite(id, 'albums');
  }

  async updateAlbum(
    id: string,
    updateAlbumtDto: UpdateAlbumtDto,
  ): Promise<Album> {
    checkId(id, 'albums');
    const album = tempDB.albums.find((album) => album.id === id);
    Object.keys(album).map((key) =>
      key !== 'id' ? (album[key] = updateAlbumtDto[key]) : '',
    );
    return album;
  }
}
