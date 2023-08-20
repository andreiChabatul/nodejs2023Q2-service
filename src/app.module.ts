import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from './auth/logging.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    LoggingModule,
    ConfigModule.forRoot({ envFilePath: '.env' })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
