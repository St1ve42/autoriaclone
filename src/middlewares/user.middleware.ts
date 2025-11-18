import type {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error.ts";
import {userService} from "../service/user.service.ts";

class UserMiddleware{
    public async checkUserExists(req: Request, res: Response, next: NextFunction){
            try{
                if(!await userService.getUser(req.params["userId"])) throw new ApiError("User not found", 404)
                next()
            }
            catch(e){
                next(e)
            }
        }
}

export const userMiddleware = new UserMiddleware()