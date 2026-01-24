import {Request, Response, NextFunction} from "express";
import {tokenService} from "../services/token.service.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {TokenTypeEnum} from "../enums/authEnums/token.type.enum.ts";
import {userService} from "../services/user.service.ts";

class OptionalAuthMiddleware {
    public async validateAccessToken (req: Request, res: Response, next: NextFunction){
        try{
            res.locals.payload = null;
            res.locals.token = null;

            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return next();
            }

            const accessToken = authHeader.split(' ')[1];
            if (!accessToken) {
                return next();
            }

            const tokenRecord = await tokenService.getByParams({ access_token: accessToken });
            if (!tokenRecord) {
                return next();
            }

            let payload: TokenPayloadType;
            try {
                payload = tokenService.verify(accessToken, TokenTypeEnum.ACCESS);
            } catch (e) {
                return next();
            }

            const {user_id} = payload

            const isDeleted = await userService.isDeleted(user_id);
            const isActive = await userService.isActive(user_id);

            if (isDeleted || !isActive) {
                return next();
            }

            res.locals.payload = payload;
            res.locals.token = accessToken;
            next();

        } catch (e) {
            next();
        }
    }

}

export const optionalAuthMiddleware = new OptionalAuthMiddleware()