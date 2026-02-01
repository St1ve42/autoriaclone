import jwt from "jsonwebtoken"
import {TokenPairType, TokenPayloadType} from "../types/TokenType.ts";
import {configs} from "../configs/configs.ts";
import {ApiError} from "../errors/api.error.ts";
import {TokenTypeEnum} from "../enums/authEnums/token.type.enum.ts";
import type { Token } from "../../prisma/src/generated/prisma/client.ts";
import {tokenRepository} from "../repository/token.repository.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class TokenService{
    public generateTokenPair(payload: TokenPayloadType): TokenPairType{
        const access_token = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
            expiresIn: configs.JWT_ACCESS_LIFETIME
        })

        const refresh_token = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
            expiresIn: configs.JWT_REFRESH_LIFETIME
        })

        return {access_token, refresh_token}
    }

    public verify(token: string, type: TokenTypeEnum): TokenPayloadType{
        try{
            let secret: string
            switch (type){
                case TokenTypeEnum.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET
                    break
                case TokenTypeEnum.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET
                    break
                case TokenTypeEnum.ACTIVATE:
                    secret = configs.JWT_ACTIVATE_SECRET
                    break
                case TokenTypeEnum.RECOVERY:
                    secret = configs.JWT_RECOVERY_SECRET
                    break
            }

            return jwt.verify(token, secret) as TokenPayloadType
        }
        catch{
            throw new ApiError("Невалідний токен", StatusCodeEnum.UNAUTHORIZED)
        }

    }

    public generateActionToken(payload: TokenPayloadType, type: Exclude<TokenTypeEnum, "access" | "refresh">): string{
        let secret: string
        let lifetime: any
        switch (type){
            case TokenTypeEnum.ACTIVATE:
                secret = configs.JWT_ACTIVATE_SECRET
                lifetime = configs.JWT_ACTIVATE_LIFETIME
                break
            case TokenTypeEnum.RECOVERY:
                secret = configs.JWT_RECOVERY_SECRET
                lifetime = configs.JWT_RECOVERY_LIFETIME
        }

        return jwt.sign(payload, secret, {
            expiresIn: lifetime
        })
    }

    public async getByParams(params: Partial<Token>): Promise<Token | null>{
        return await tokenRepository.getByParams(params)
    }

}

export const tokenService = new TokenService()