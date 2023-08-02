import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Artist } from 'src/types';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { deleteFavorite } from 'src/utils/deleteFavorite';
import { checkId } from 'src/utils/checkId';

@Injectable()
export class ArtistService {
  async getAllArtist(): Promise<Artist[]> {
    return tempDB.artists;
  }

  async getOneArtist(id: string): Promise<Artist> {
    checkId(id, 'artists');
    return tempDB.artists.find((user) => user.id === id);
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    tempDB.artists.push(newArtist);
    return newArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    checkId(id, 'artists');
    const indexArtist = tempDB.artists.findIndex((artist) => artist.id === id);
    tempDB.artists.splice(indexArtist, 1);
    tempDB.albums.map((album) =>
      album.artistId === id ? (album.artistId = null) : '',
    );
    tempDB.tracks.map((track) =>
      track.artistId === id ? (track.artistId = null) : '',
    );
    deleteFavorite(id, 'artists');
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    checkId(id, 'artists');
    const artist = tempDB.artists.find((user) => user.id === id);
    Object.keys(artist).map((key) =>
      key !== 'id' ? (artist[key] = updateArtistDto[key]) : '',
    );
    return artist;
  }
}
