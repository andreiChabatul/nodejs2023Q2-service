import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { TokenService } from "./token.service";

export interface LoginBase {
    login: string;
    password: string;
    id: string;
}

export interface TokenBase {
    refreshToken: string;
    id: string;
}

export const baseLogin: LoginBase[] = []
export const baseToken: TokenBase[] = []
@Injectable()
export class LoggingService {

    constructor(private tokenService: TokenService) { }

    async register(loginUserDto: LoginUserDto) {

        const hashPassword = await bcrypt.hash(loginUserDto.password, parseInt(process.env.CRYPT_SALT));
        baseLogin.push({ ...loginUserDto, password: hashPassword, id: '123' });
        const tokens = this.tokenService.generateToken(loginUserDto.login);
        await this.tokenService.saveToken('123', tokens.refreshToken);
        return { ...tokens };
    }

    login(loginUserDto: LoginUserDto) {

    }

}
