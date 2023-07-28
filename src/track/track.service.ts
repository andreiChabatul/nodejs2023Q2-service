import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Track } from 'src/types';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { deleteFavorite } from 'src/utils/deleteFavorite';

@Injectable()
export class TrackService {

    async getAllTrack(): Promise<Track[]> {
        return tempDB.tracks;
    }

    async getOneTrack(id: string): Promise<Track> {
        this.checkId(id);
        return tempDB.tracks.find(track => track.id === id);
    }

    async createTrack(createTrackDto: CreateTrackDto) {
        const newTrack: Track = {
            ...createTrackDto,
            id: uuidv4(),
        }
        tempDB.tracks.push(newTrack);
        return newTrack;
    }

    async deleteTrack(id: string) {
        this.checkId(id);
        const indexTrack = tempDB.tracks.findIndex((track) => track.id === id);
        tempDB.tracks.splice(indexTrack, 1);
        deleteFavorite(id, 'tracks');
    }

    async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
        this.checkId(id);
        const track = tempDB.tracks.find(track => track.id === id);
        track.albumId = updateTrackDto.albumId;
        track.artistId = updateTrackDto.artistId;
        track.duration = updateTrackDto.duration;
        track.name = updateTrackDto.name;
        return track;
    }

    private checkId(id: string): void {
        let isTrack = true;
        tempDB.tracks.map((track) => track.id === id ? isTrack = false : '');
        if (isTrack) throw new HttpException('Track id does not exist', HttpStatus.NOT_FOUND);
    }

}
