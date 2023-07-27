import { IsNotEmpty, IsBoolean } from "class-validator";

export class UpdateArtistDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}