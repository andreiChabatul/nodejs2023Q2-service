import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { tempDB } from 'src/tempBD/storage';
import { Album, Artist, Favorites, Track, typeFavorites } from 'src/types';

@Injectable()
export class FavoritesService {
  async getAllFavorites(): Promise<Favorites> {
    return tempDB.favorites;
  }

  async addFavorites(id: string, type: typeFavorites): Promise<void> {
    const addIndex = tempDB[type]?.findIndex(
      (item: Album | Artist | Track) => item.id === id,
    );

    if (addIndex > -1) {
      switch (type) {
        case 'albums':
          const itemAlbums = tempDB[type][addIndex];
          tempDB.favorites[type].push(itemAlbums);
          break;
        case 'artists':
          const itemArtists = tempDB[type][addIndex];
          tempDB.favorites[type].push(itemArtists);
          break;
        case 'tracks':
          const itemTracks = tempDB[type][addIndex];
          tempDB.favorites[type].push(itemTracks);
          break;
        default:
          break;
      }
      return;
    }
    this.ErrorId(type);
  }

  async deleteFavorites(id: string, type: typeFavorites): Promise<void> {
    const deleteFavorite = tempDB.favorites[type]?.findIndex(
      (item: Album | Artist | Track) => item.id === id,
    );
    if (deleteFavorite > -1) {
      tempDB.favorites[type].splice(deleteFavorite, 1);
      return;
    }
    this.ErrorId(type);
  }

  private ErrorId(type: string): void {
    throw new HttpException(
      `${type} id does not exist`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
