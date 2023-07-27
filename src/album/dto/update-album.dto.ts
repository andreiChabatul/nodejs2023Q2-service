import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAlbumtDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly year: number;

    @IsString()
    readonly artistId: string | null;
}