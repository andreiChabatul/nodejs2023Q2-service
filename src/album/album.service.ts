import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Album } from 'src/types';
import { CreateAlbumtDto } from './dto/create-album.dto';
import { UpdateAlbumtDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {

    async getAllAlbum(): Promise<Album[]> {
        return tempDB.album;
    }

    async getOneAlbum(id: string): Promise<Album> {
        this.checkId(id);
        return tempDB.album.find(album => album.id === id);
    }

    async createAlbum(createAlbumtDto: CreateAlbumtDto) {
        const newAlbum: Album = {
            ...createAlbumtDto,
            id: uuidv4(),
        }
        tempDB.album.push(newAlbum);
        return newAlbum;
    }

    async deleteAlbum(id: string) {
        this.checkId(id);
        const indexAlbum = tempDB.album.findIndex((album) => album.id === id);
        tempDB.album.splice(indexAlbum, 1);
    }

    async updateAlbum(id: string, updateAlbumtDto: UpdateAlbumtDto) {
        this.checkId(id);
        const album = tempDB.album.find(album => album.id === id);
        album.name = updateAlbumtDto.name;
        album.year = updateAlbumtDto.year;
        album.artistId = updateAlbumtDto.artistId;
        return album;
    }

    private checkId(id: string): void {
        let isAlbum = true;
        tempDB.album.map((album) => album.id === id ? isAlbum = false : '');
        if (isAlbum) throw new HttpException('Album id does not exist', HttpStatus.NOT_FOUND);
    }

}
