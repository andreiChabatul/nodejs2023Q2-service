import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class TokenService {

    generateToken(payload: string) {
        const accessToken = jwt.sign({payload}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
        const refreshToken = jwt.sign({payload}, process.env.JWT_SECRET_REFRESH_KEY, { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME });
        return {
            accessToken,
            refreshToken
        }
    }


    async saveToken(userId: string, refreshToken: string){
        //ищем

        

    }
}
