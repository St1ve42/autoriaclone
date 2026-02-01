import {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error.ts";
import {tokenService} from "../services/token.service.ts";
import {TokenTypeEnum} from "../enums/authEnums/token.type.enum.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {RefreshTokenType} from "../types/TokenType.ts";
import {userService} from "../services/user.service.ts";


class StrictAuthMiddleware {
    public async validateAccessToken(req: Request, res: Response, next: NextFunction){
        try{
            const authHeader = req.headers.authorization
            if(!authHeader){
                throw new ApiError("Відсутній токен", StatusCodeEnum.BAD_REQUEST)
            }

            const accessToken = authHeader.split(' ')[1]
            if(!accessToken){
                throw new ApiError("Відсутній access токен", StatusCodeEnum.BAD_REQUEST)
            }

            const tokenRecord = await tokenService.getByParams({access_token: accessToken})
            if(!tokenRecord){
                throw new ApiError("Токена не існує", StatusCodeEnum.UNAUTHORIZED)
            }

            const payload = tokenService.verify(accessToken, TokenTypeEnum.ACCESS)
            const {user_id} = payload

            const isDeleted = await userService.isDeleted(user_id);
            const isActive = await userService.isActive(user_id);
            if(!isActive){
                throw new ApiError("Користувач не активний", StatusCodeEnum.FORBIDDEN)
            }
            if(isDeleted){
                throw new ApiError("Користувач є видалений", StatusCodeEnum.FORBIDDEN)
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
                throw new ApiError("Токена не існує", StatusCodeEnum.BAD_REQUEST)
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

export const strictAuthMiddleware = new StrictAuthMiddleware()