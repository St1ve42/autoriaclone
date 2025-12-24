import type {UserUpdateDTOType} from "../types/UserType.ts";
import {roleService} from "../services/role.service.ts";
import type {Request, Response, NextFunction} from "express";

class RoleMiddleware{
    public async validateRole (req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as UserUpdateDTOType
            if(body.role){
                res.locals.role_id = await roleService.getIdByName(body.role)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

}

export const roleMiddleware = new RoleMiddleware()