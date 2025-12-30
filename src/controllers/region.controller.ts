import {Request, Response, NextFunction} from "express";
import {regionService} from "../services/region.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class RegionController{
    public async getList (req: Request, res: Response, next: NextFunction){
        try{
            const regions = await regionService.getList()
            res.status(StatusCodeEnum.OK).json(regions)
        }
        catch(e){
            next(e)
        }
    }

}

export const regionController = new RegionController()