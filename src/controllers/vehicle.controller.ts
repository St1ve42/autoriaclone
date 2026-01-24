import type {NextFunction, Request, Response} from "express";
import {vehicleService} from "../services/vehicle.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {BaseQueryType} from "../types/QueryType.ts";

class VehicleController{
    public async getMakeList(req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as BaseQueryType
            const [makes, total] = await vehicleService.getMakeList(query)
            res.status(StatusCodeEnum.OK).json({
                data: makes,
                total,
                ...query
            })
        }
        catch(e){
            next(e)
        }
    }

    public async getModelList(req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as BaseQueryType
            console.log(query)
            const makeId = req.params.makeId as string
            const [models, total] = await vehicleService.getModelList(makeId, query)
            res.status(StatusCodeEnum.OK).json({
                data: models,
                total,
                ...query
            })
        }
        catch(e){
            next(e)
        }
    }

    public async getModel(req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as BaseQueryType
            const makeId = req.params.makeId as string
            const modelId = req.params.modelId as string
            const [model, total] = await vehicleService.getModel(makeId, modelId, query)
            res.status(StatusCodeEnum.OK).json(({
                data: model,
                total,
                ...query
            }))
        }
        catch(e){
            next(e)
        }
    }


}

export const vehicleController = new VehicleController()