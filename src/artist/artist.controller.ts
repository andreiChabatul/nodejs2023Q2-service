import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {

    constructor(private artistServise: ArtistService) { }

    @Get()
    async getAll() {
        return this.artistServise.getAllArtist();
    }

    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.artistServise.getOneArtist(id);
    }

    @Post()
    async createUser(@Body() createArtistDto: CreateArtistDto) {
        return this.artistServise.createArtist(createArtistDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return await this.artistServise.deleteArtist(id);
    }

    @Put(':id')
    async updatePasword(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateArtistDto: UpdateArtistDto
    ) {
        return await this.artistServise.updateArtist(id, updateArtistDto)
    }
}
