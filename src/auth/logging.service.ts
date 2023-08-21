import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { TokenService } from "./token.service";
import { prisma } from "src/main";
import { UserLogin } from "src/types";
import { ErrorLogin } from "src/utils/errorHandling";
import { RefreshLoginDto } from "./dto/refresh-login.dto";

@Injectable()
export class LoggingService {

    constructor(private tokenService: TokenService) { }

    async register(loginUserDto: LoginUserDto) {
  
        const candidate = await prisma.userData.findFirst({
            where: { login: loginUserDto.login }
        })
        const hashPassword = await bcrypt.hash(loginUserDto.password, parseInt(process.env.CRYPT_SALT));
        const user = await prisma.userData.create({
            data: {
                ...loginUserDto, password: hashPassword
            }
        }) as UserLogin

        const tokens = this.tokenService.generateToken(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens };
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await prisma.userData.findFirstOrThrow({
            where: { login: loginUserDto.login }
        }).catch(() => ErrorLogin('User no found'));
    
        const isPassword = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPassword) { ErrorLogin('Password not matching') }

        const tokens = this.tokenService.generateToken(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens };
    }

    async refresh({ refreshToken }: RefreshLoginDto) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        const userData = this.tokenService.validateRefreshtoken(refreshToken);
        const tokenDB = await this.tokenService.searchrefreshToken(refreshToken);

        if (!userData || !tokenDB) {
            throw new UnauthorizedException();
        } else {

            const user = await prisma.userData.findFirst({ where: { id: tokenDB.idUser } })
            const tokens = this.tokenService.generateToken(user);
            await this.tokenService.saveToken(user.id, tokens.refreshToken);
            return { ...tokens };
        }
    }

}
