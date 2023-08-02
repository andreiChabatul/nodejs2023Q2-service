import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAlbumtDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsString()
  @IsOptional()
  readonly artistId: string | null;
}
