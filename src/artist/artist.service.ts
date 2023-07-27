import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Artist } from 'src/types';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {


    async getAllArtist(): Promise<Artist[]> {
        return tempDB.artists;
    }

    async getOneArtist(id: string): Promise<Artist> {
        this.checkId(id);
        return tempDB.artists.find(user => user.id === id);
    }

    async createArtist(createArtistDto: CreateArtistDto) {
        const newArtist: Artist = {
            ...createArtistDto,
            id: uuidv4(),
        }
        tempDB.artists.push(newArtist);
        return newArtist;
    }

    async deleteArtist(id: string) {
        this.checkId(id);
        const indexArtist = tempDB.artists.findIndex((artist) => artist.id === id);
        tempDB.artists.splice(indexArtist, 1);
        tempDB.albums.map((album) => album.artistId === id ? album.artistId = null : '');
        tempDB.tracks.map((track) => track.artistId === id ? track.artistId = null : '');
    }

    async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
        this.checkId(id);
        const artist = tempDB.artists.find(user => user.id === id);
        artist.grammy = updateArtistDto.grammy;
        artist.name = updateArtistDto.name;
        return artist;
    }

    private checkId(id: string): void {
        let isUser = true;
        tempDB.artists.map((user) => user.id === id ? isUser = false : '');
        if (isUser) throw new HttpException('Artist id does not exist', HttpStatus.NOT_FOUND);
    }
}
