import {Request, Response, NextFunction} from "express";
import {subscribeService} from "../services/subscribe.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {PlanSubscribeEnum} from "../../prisma/src/generated/prisma/enums.ts";

class SubscribeController{
    public async setPrice (req: Request, res: Response, next: NextFunction){
        try{
            const {price, code} = req.body as {price: number, code: PlanSubscribeEnum}
            const subscribe = await subscribeService.setPrice(code, price)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async setDuration (req: Request, res: Response, next: NextFunction){
        try{
            const {duration, code} = req.body as {duration: number, code: PlanSubscribeEnum}
            const subscribe = await subscribeService.setDuration(code, duration)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async activate (req: Request, res: Response, next: NextFunction){
        try{
            const {code} = req.body as {code: PlanSubscribeEnum}
            const subscribe = await subscribeService.activate(code)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async deactivate (req: Request, res: Response, next: NextFunction){
        try{
            const {code} = req.body as {code: PlanSubscribeEnum}
            const subscribe = await subscribeService.deactivate(code)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

}

export const subscribeController = new SubscribeController()