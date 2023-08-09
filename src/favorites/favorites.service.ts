import { Injectable } from '@nestjs/common';
import { prisma } from 'src/main';
import { Favorites, actionsFavorites } from 'src/types';
import { ErrorNoFavorities } from 'src/utils/errorHandling';

@Injectable()
export class FavoritesService {


  async getAllFavorites(): Promise<Favorites> {

    const favoritesAlbum = await prisma.album.findMany({
      where: { favorites: true }
    })
    const favoritesArtist = await prisma.artist.findMany({
      where: { favorites: true }
    })
    const favoritesTrack = await prisma.track.findMany({
      where: { favorites: true }
    })

    favoritesAlbum.map((album) => delete album.favorites);
    favoritesArtist.map((artist) => delete artist.favorites);
    favoritesTrack.map((track) => delete track.favorites);

    return {
      albums: favoritesAlbum,
      tracks: favoritesTrack,
      artists: favoritesArtist,
    };
  }

  async updateAlbumFavorites(id: string, action: actionsFavorites) {
    await prisma.album.update({
      where: { id },
      data: { favorites: action === 'add' ? true : false }
    }).catch(() => ErrorNoFavorities('albums'));
  }

  async updatArtistFavorites(id: string, action: actionsFavorites) {
    await prisma.artist.update({
      where: { id },
      data: { favorites: action === 'add' ? true : false }
    }).catch(() => ErrorNoFavorities('artists'));
  }

  async updateTrackFavorites(id: string, action: actionsFavorites) {
    await prisma.track.update({
      where: { id },
      data: { favorites: action === 'add' ? true : false }
    }).catch(() => ErrorNoFavorities('tracks'));
  }
}
