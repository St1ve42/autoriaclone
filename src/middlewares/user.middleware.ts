import type {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error.ts";
import {userService} from "../services/user.service.ts";
import type {UserCreateDTOType} from "../types/UserType.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

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

}

export const userMiddleware = new UserMiddleware()