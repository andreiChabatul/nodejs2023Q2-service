import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Track } from 'src/types';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { deleteFavorite } from 'src/utils/deleteFavorite';
import { checkId } from 'src/utils/checkId';

@Injectable()
export class TrackService {
  async getAllTrack(): Promise<Track[]> {
    return tempDB.tracks;
  }

  async getOneTrack(id: string): Promise<Track> {
    checkId(id, 'tracks');
    return tempDB.tracks.find((track) => track.id === id);
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      ...createTrackDto,
      id: uuidv4(),
    };
    tempDB.tracks.push(newTrack);
    return newTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    checkId(id, 'tracks');
    const indexTrack = tempDB.tracks.findIndex((track) => track.id === id);
    tempDB.tracks.splice(indexTrack, 1);
    deleteFavorite(id, 'tracks');
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    checkId(id, 'tracks');
    const track = tempDB.tracks.find((track) => track.id === id);
    Object.keys(track).map((key) =>
      key !== 'id' ? (track[key] = updateTrackDto[key]) : '',
    );
    return track;
  }
}
