import { Controller, Post, Get, Param, ParseUUIDPipe, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {

    constructor(private favoritesService: FavoritesService) { }

    @Get()
    async getAllTrack() {
        return await this.favoritesService.getAllFavorites();
    }

    @Post('track/:id')
    async addFavoritesTrack(@Param('id', ParseUUIDPipe) id: string) {
        return await this.favoritesService.AddFavorites(id, 'track');
    }

    @Post('album/:id')
    async addFavoritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
        return await this.favoritesService.AddFavorites(id, 'album');
    }

    @Post('artist/:id')
    async addFavoritesArtist(@Param('id', ParseUUIDPipe) id: string) {
        return await this.favoritesService.AddFavorites(id, 'artist');
    }


}
