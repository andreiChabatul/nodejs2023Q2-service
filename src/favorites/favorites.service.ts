import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { tempDB } from 'src/tempBD/storage';
import { Album, Artist, Track, typeFavorites } from 'src/types';


@Injectable()
export class FavoritesService {

    async getAllFavorites() {
        return tempDB.favorites;
    }

    // async AddFavoriteTrack(id: string) {
    //     const track = tempDB.track.find(track => track.id === id);
    //     if (track) {
    //         tempDB.favorites.tracks.push(track);
    //         return track;
    //     }
    //     this.ErrorId('Track')
    // }

    // async AddFavoriteAlbum(id: string) {
    //     const album = tempDB.album.find(album => album.id === id);
    //     if (album) {
    //         tempDB.favorites.albums.push(album);
    //         return album;
    //     }
    //     this.ErrorId('Album')
    // }

    // async AddFavoriteArtists(id: string) {
    //     const artist = tempDB.artists.find(artist => artist.id === id);
    //     if (artist) {
    //         tempDB.favorites.artists.push(artist);
    //         return artist;
    //     }
    //     this.ErrorId('Artist')
    // }

    async AddFavorites<T, K extends keyof T>(id: string, type: K) {
        const add = tempDB[type]?.find((item: Album | Artist | Track) => item.id === id);
        if (add) {
            console.log(add, tempDB[type]);
            tempDB[type]?.push(add);
            return add;
        } else { throw new HttpException(`${type} id does not exist`, HttpStatus.UNPROCESSABLE_ENTITY); }
    }

    async DeleteFavoriteTrack(id: string) {

    }

    private ErrorId(type: string) {

    }

}
