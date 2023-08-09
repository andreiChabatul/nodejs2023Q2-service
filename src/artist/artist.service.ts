import { Injectable } from '@nestjs/common';
import { Artist } from 'src/types';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ErrorNoFound, } from 'src/utils/errorHandling';
import { prisma } from 'src/main';

@Injectable()
export class ArtistService {
  async getAllArtist(): Promise<Artist[]> {
    return prisma.artist.findMany();
  }

  async getOneArtist(id: string): Promise<Artist> {
    const artist = await prisma.artist.findUniqueOrThrow({
      where: { id }
    }).catch(() => ErrorNoFound('artists'));
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await prisma.artist.create({
      data: {
        ...createArtistDto
      },
    })
    return newArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    await prisma.artist.delete({
      where: { id }
    }).catch(() => ErrorNoFound('artists'));
    await prisma.album.updateMany(
      {
        where: { artistId: id },
        data: { artistId: null }
      }
    )
    await prisma.track.updateMany(
      {
        where: { artistId: id },
        data: { artistId: null }
      }
    )
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const updateArtist = await prisma.artist.update({
      where: { id },
      data: updateArtistDto
    }).catch(() => ErrorNoFound('artists'));

    return updateArtist;
  }
}
