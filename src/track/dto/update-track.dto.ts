import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTrackDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly duration: number;

    @IsString()
    @IsOptional()
    readonly artistId: string | null;

    @IsString()
    @IsOptional()
    readonly albumId: string | null;
}