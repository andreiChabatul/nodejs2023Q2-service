import { IsNotEmpty, IsNumber, IsString, Equals, IsIn, IsOptional } from "class-validator";

export class CreateAlbumtDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly year: number;

    @IsString()
    @IsOptional()
    readonly artistId: string | null;
}