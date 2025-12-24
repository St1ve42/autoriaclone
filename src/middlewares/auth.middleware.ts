import {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error.ts";
import {tokenService} from "../services/token.service.ts";
import {TokenTypeEnum} from "../enums/authEnums/token.type.enum.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {RefreshTokenType} from "../types/TokenType.ts";
import {userService} from "../services/user.service.ts";


class AuthMiddleware{
    public async validateAccessToken(req: Request, res: Response, next: NextFunction){
        try{
            const authHeader = req.headers.authorization
            if(!authHeader){
                throw new ApiError("No access token provided", StatusCodeEnum.BAD_REQUEST)
            }
            const accessToken = authHeader.split(' ')[1]
            if(!accessToken){
                throw new ApiError("No access token provided", StatusCodeEnum.BAD_REQUEST)
            }
            const tokenRecord = await tokenService.getByParams({access_token: accessToken})
            if(!tokenRecord){
                throw new ApiError("No existent token", StatusCodeEnum.UNAUTHORIZED)
            }
            const payload = tokenService.verify(accessToken, TokenTypeEnum.ACCESS)
            if(!await userService.isActive(payload.user_id)){
                throw new ApiError("User is not active", StatusCodeEnum.FORBIDDEN)
            }
            if(await userService.isDeleted(payload.user_id)){
                throw new ApiError("User is deleted", StatusCodeEnum.FORBIDDEN)
            }
            res.locals.payload = payload
            res.locals.token = accessToken
            next()
        }
        catch(e){
            next(e)
        }
    }

    public async validateRefreshToken (req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.body as RefreshTokenType
            const tokenRecord = await tokenService.getByParams({refresh_token: refreshToken})
            if(!tokenRecord){
                throw new ApiError("No existent token", StatusCodeEnum.BAD_REQUEST)
            }
            res.locals.payload = tokenService.verify(refreshToken, TokenTypeEnum.REFRESH)
            res.locals.token_id = tokenRecord.id
            next()
        }
        catch(e){
            next(e)
        }
    }

}

export const authMiddleware = new AuthMiddleware()