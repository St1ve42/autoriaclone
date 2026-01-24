import {Request, Response, NextFunction} from "express";
import {subscriptionPlanService} from "../services/subscription.plan.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {SubscriptionPlanCreateInput, SubscriptionPlanUpdateInput} from "../../prisma/src/generated/prisma/models/SubscriptionPlan.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {subscriptionPurchaseService} from "../services/subscription.purchase.service.ts";
import {subscriptionPurchasePresenter} from "../presenters/subscription.purchase.presenter.ts";

class SubscriptionPlanController{
    public async get (req: Request, res: Response, next: NextFunction){
        try{
            const planId = req.params.planId as string
            const subscribe = await subscriptionPlanService.get(planId)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async getList (req: Request, res: Response, next: NextFunction){
        try{
            const subscribes = await subscriptionPlanService.getList()
            res.status(StatusCodeEnum.OK).json(subscribes)
        }
        catch(e){
            next(e)
        }
    }

    public async create (req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as SubscriptionPlanCreateInput
            const subscribe = await subscriptionPlanService.create(body)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async update (req: Request, res: Response, next: NextFunction){
        try{
            const subscriptionId = req.params.subscriptionId as string
            const body = req.body as Omit<SubscriptionPlanUpdateInput,"is_active" | "id" | "code">
            const subscribe = await subscriptionPlanService.update(subscriptionId, body)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async activate (req: Request, res: Response, next: NextFunction){
        try{
            const subscriptionId = req.params.subscriptionId as string
            const subscribe = await subscriptionPlanService.activate(subscriptionId)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async deactivate (req: Request, res: Response, next: NextFunction){
        try{
            const subscriptionId = req.params.subscriptionId as string
            const subscribe = await subscriptionPlanService.deactivate(subscriptionId)
            res.status(StatusCodeEnum.OK).json(subscribe)
        }
        catch(e){
            next(e)
        }
    }

    public async purchase (req: Request, res: Response, next: NextFunction){
        try{
            const planId = req.params.planId as string
            const {user_id} = res.locals.payload as TokenPayloadType
            const purchase = await subscriptionPurchaseService.purchase(planId, user_id)
            res.status(StatusCodeEnum.OK).json(subscriptionPurchasePresenter.subscriptionPurchaseRes(purchase))
        }
        catch(e){
            next(e)
        }
    }

}

export const subscriptionPlanController = new SubscriptionPlanController()