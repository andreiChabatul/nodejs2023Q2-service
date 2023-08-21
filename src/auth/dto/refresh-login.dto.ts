import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshLoginDto {
    @IsNotEmpty()
    @IsString()
    readonly refreshToken: string;
}
