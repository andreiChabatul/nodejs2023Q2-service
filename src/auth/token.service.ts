import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { prisma } from "src/main";
import { UserLogin } from "src/types";
import { ErrorLogin } from "src/utils/errorHandling";


@Injectable()
export class TokenService {

    generateToken({ id, login }: UserLogin) {
        const accessToken = jwt.sign({ id, login }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
        const refreshToken = jwt.sign({ id, login }, process.env.JWT_SECRET_REFRESH_KEY, { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME });
        return {
            accessToken,
            refreshToken
        }
    }


    async saveToken(idUser: string, refreshToken: string) {
        const tokenData = await prisma.tokenBase.findFirst({ where: { idUser } });

        if (tokenData) {
            await prisma.tokenBase.updateMany({
                where: { idUser },
                data: { refreshToken }
            })
        }
        const token = await prisma.tokenBase.create({ data: { idUser, refreshToken } });
        return token;
    }

    validateRefreshtoken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET_REFRESH_KEY);
            return userData;
        } catch (error) {
            ErrorLogin('Refresh token is invalid or expired');
        }

    }

    validateAccesstoken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return userData;
        } catch (error) {
            return null;
        }
    }

    async searchrefreshToken(refreshToken: string) {
        const tokendata = await prisma.tokenBase.findFirstOrThrow(
            { where: { refreshToken } }
        ).catch(() => {throw new UnauthorizedException()});
        return tokendata;
    }
}
