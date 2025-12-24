import type {NextFunction, Request, Response} from "express";
import {vehicleService} from "../services/vehicle.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import type {VehicleType} from "../types/VehicleType.ts";
import {vehiclePresenter} from "../presenters/vehicle.presenter.ts";
import {VehicleQueryType} from "../types/QueryType.ts";

class VehicleController{
    public async getList(req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as VehicleQueryType
            const [vehicles, total] = await vehicleService.getList(query)
            res.status(StatusCodeEnum.OK).json(vehiclePresenter.list(vehicles, total, query))
        }
        catch(e){
            next(e)
        }
    }

    public async get(req: Request, res: Response, next: NextFunction){
        try{
            const {vehicleId} = req.params as {vehicleId: string}
            const vehicle = await vehicleService.get(vehicleId)
            res.status(StatusCodeEnum.OK).json(vehiclePresenter.res(vehicle))
        }
        catch(e){
            next(e)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as VehicleType
            const vehicle = await vehicleService.create(body)
            res.status(StatusCodeEnum.CREATED).json(vehiclePresenter.res(vehicle))
        }
        catch(e){
            next(e)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {vehicleId} = req.params as {vehicleId: string}
            const vehicle = await vehicleService.delete(vehicleId)
            res.status(StatusCodeEnum.OK).json(vehiclePresenter.res(vehicle))
        }
        catch(e){
            next(e)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        try{
            const {vehicleId} = req.params as {vehicleId: string}
            const body = req.body as VehicleType
            const vehicle = await vehicleService.update(vehicleId, body)
            res.status(200).json(vehiclePresenter.res(vehicle))
        }
        catch(e){
            next(e)
        }
    }
}

export const vehicleController = new VehicleController()