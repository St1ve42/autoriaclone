import type {Request, Response, NextFunction} from "express";
import type {UserCreateDTOType} from "../types/UserType.ts";
import {regionService} from "../service/region.service.ts";

class RegionMiddleware{
    public async validateRegion (req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as UserCreateDTOType
            if(body.region){
                res.locals.region_id = await regionService.getRegionId(body.region + " область")
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

}

export const regionMiddleware = new RegionMiddleware()