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
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAllTrack() {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async addFavoritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addFavorites(id, 'tracks');
  }

  @Post('album/:id')
  async addFavoritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addFavorites(id, 'albums');
  }

  @Post('artist/:id')
  async addFavoritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addFavorites(id, 'artists');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteFavorites(id, 'tracks');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteFavorites(id, 'albums');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteFavorites(id, 'artists');
  }
}
