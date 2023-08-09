import { Injectable } from '@nestjs/common';
import { Track } from 'src/types';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ErrorNoFound } from 'src/utils/errorHandling';
import { prisma } from 'src/main';

@Injectable()
export class TrackService {
  async getAllTrack(): Promise<Track[]> {
    return prisma.track.findMany();
  }

  async getOneTrack(id: string): Promise<Track> {
    const track = await prisma.track.findUniqueOrThrow({
      where: { id }
    }).catch(() => ErrorNoFound('tracks'));
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await prisma.track.create({
      data: {
        ...createTrackDto
      },
    })
    return newTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    await prisma.track.delete({
      where: { id }
    }).catch(() => ErrorNoFound('tracks'));
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const updateTrack = await prisma.track.update({
      where: { id },
      data: {...updateTrackDto}
    }).catch(() => ErrorNoFound('tracks'));

    return updateTrack;
  }
}
