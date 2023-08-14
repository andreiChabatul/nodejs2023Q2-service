import {
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
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
    return await this.favoritesService.updateTrackFavorites(id, 'add');
  }

  @Post('album/:id')
  async addFavoritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.updateAlbumFavorites(id, 'add');
  }

  @Post('artist/:id')
  async addFavoritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.updatArtistFavorites(id, 'add');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.updateTrackFavorites(id, 'delete');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.updateAlbumFavorites(id, 'delete');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.updatArtistFavorites(id, 'delete');
  }
}
