import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Album } from 'src/types';
import { CreateAlbumtDto } from './dto/create-album.dto';
import { UpdateAlbumtDto } from './dto/update-album.dto';
import { deleteFavorite } from 'src/utils/deleteFavorite';

@Injectable()
export class AlbumService {

    async getAllAlbum(): Promise<Album[]> {
        return tempDB.albums;
    }

    async getOneAlbum(id: string): Promise<Album> {
        this.checkId(id);
        return tempDB.albums.find(album => album.id === id);
    }

    async createAlbum(createAlbumtDto: CreateAlbumtDto) {
        const newAlbum: Album = {
            ...createAlbumtDto,
            id: uuidv4(),
        }
        tempDB.albums.push(newAlbum);
        return newAlbum;
    }

    async deleteAlbum(id: string) {
        this.checkId(id);
        const indexAlbum = tempDB.albums.findIndex((album) => album.id === id);
        tempDB.albums.splice(indexAlbum, 1);
        tempDB.tracks.map((track) => track.albumId === id ? track.albumId = null : '');
        deleteFavorite(id, 'albums');
    }

    async updateAlbum(id: string, updateAlbumtDto: UpdateAlbumtDto) {
        this.checkId(id);
        const album = tempDB.albums.find(album => album.id === id);
        album.name = updateAlbumtDto.name;
        album.year = updateAlbumtDto.year;
        album.artistId = updateAlbumtDto.artistId;
        return album;
    }

    private checkId(id: string): void {
        let isAlbum = true;
        tempDB.albums.map((album) => album.id === id ? isAlbum = false : '');
        if (isAlbum) throw new HttpException('Album id does not exist', HttpStatus.NOT_FOUND);
    }

}
