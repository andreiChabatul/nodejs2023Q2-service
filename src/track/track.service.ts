import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { tempDB } from 'src/tempBD/storage';
import { Track } from 'src/types';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {

    async getAllTrack(): Promise<Track[]> {
        return tempDB.track;
    }

    async getOneTrack(id: string): Promise<Track> {
        this.checkId(id);
        return tempDB.track.find(track => track.id === id);
    }

    async createTrack(createTrackDto: CreateTrackDto) {
        const newTrack: Track = {
            ...createTrackDto,
            id: uuidv4(),
        }
        tempDB.track.push(newTrack);
        return newTrack;
    }

    async deleteTrack(id: string) {
        this.checkId(id);
        const indexTrack = tempDB.track.findIndex((track) => track.id === id);
        tempDB.track.splice(indexTrack, 1);
    }

    async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
        this.checkId(id);
        const track = tempDB.track.find(track => track.id === id);
        track.albumId = updateTrackDto.albumId;
        track.artistId = updateTrackDto.artistId;
        track.duration = updateTrackDto.duration;
        track.name = updateTrackDto.name;
        return track;
    }

    private checkId(id: string): void {
        let isTrack = true;
        tempDB.track.map((track) => track.id === id ? isTrack = false : '');
        if (isTrack) throw new HttpException('Track id does not exist', HttpStatus.NOT_FOUND);
    }

}
