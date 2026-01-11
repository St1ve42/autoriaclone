import type {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error.ts";
import {userService} from "../services/user.service.ts";
import type {UserCreateDTOType} from "../types/UserType.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {AccountTypeEnum} from "../../prisma/src/generated/prisma/enums.ts";

class UserMiddleware{
    public async checkEmailTaken(req: Request, res: Response, next: NextFunction){
        try{
              const body = req.body as UserCreateDTOType
              if(await userService.getByEmail(body.email)) throw new ApiError("Email is taken", StatusCodeEnum.CONFLICT)
              next()
        }
        catch(e){
            next(e)
        }
    }

    public async checkEmailExists(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as UserCreateDTOType
            if(!await userService.getByEmail(body.email)) throw new ApiError("Email doesn't exist", StatusCodeEnum.NOT_FOUND)
            next()
        }
        catch(e){
            next(e)
        }
    }

    public async checkPremiumAccount (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const {account_type} = await userService.get(user_id)
            if(account_type !== AccountTypeEnum.premium){
                throw new ApiError("Only users with premium account can see statistics", StatusCodeEnum.FORBIDDEN)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

    public async checkUserIsBanned (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            if(await userService.isBanned(user_id)){
                throw new ApiError("User is banned", StatusCodeEnum.FORBIDDEN)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

    public async checkActionWithSelf (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const userId = req.params.userId
            if(user_id === userId){
                throw new ApiError("Operation with yourself is not allowed", StatusCodeEnum.CONFLICT)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }


}

export const userMiddleware = new UserMiddleware()