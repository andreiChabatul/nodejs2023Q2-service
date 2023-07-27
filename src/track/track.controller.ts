import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {

    constructor(private trackService: TrackService) { }

    @Get()
    async getAll() {
        return this.trackService.getAllTrack();
    }

    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.trackService.getOneTrack(id);
    }

    @Post()
    async createAlbum(@Body() createTrackDto: CreateTrackDto) {
        return this.trackService.createTrack(createTrackDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
        return await this.trackService.deleteTrack(id);
    }

    @Put(':id')
    async updateAlbum(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTrackDto: UpdateTrackDto
    ) {
        return await this.trackService.updateTrack(id, updateTrackDto)
    }
}
