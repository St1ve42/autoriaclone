import type {Request, Response, NextFunction} from "express";
import {CreateReportedVehicleDTOType} from "../types/ReportedVehicleType.ts";
import {reportedVehicleService} from "../services/reported.vehicle.service.ts";
import {BaseQueryType} from "../types/QueryType.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {reportedVehiclePresenter} from "../presenters/reported.vehicle.controller.ts";
import {TokenPayloadType} from "../types/TokenType.ts";

class ReportedVehicleController{
    public async create (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const body = req.body as CreateReportedVehicleDTOType
            const reportedVehicle = await reportedVehicleService.create(body, user_id)
            res.status(StatusCodeEnum.CREATED).json(reportedVehiclePresenter.userRes(reportedVehicle))
        }
        catch(e){
            next(e)
        }
    }


    public async getList (req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as BaseQueryType
            const [reportedVehicles, total] = await reportedVehicleService.getList(query)
            res.status(StatusCodeEnum.OK).json(await reportedVehiclePresenter.staffList(reportedVehicles, total, query))

        }
        catch(e){
            next(e)
        }
    }

    public async confirm (req: Request, res: Response, next: NextFunction){
        try{
            const reportedVehicleId = req.params.reportedVehicleId as string
            const reportedVehicle = await reportedVehicleService.confirm(reportedVehicleId);
            res.status(StatusCodeEnum.OK).json(await reportedVehiclePresenter.staffRes(reportedVehicle))

        }
        catch(e){
            next(e)
        }
    }

    public async reject (req: Request, res: Response, next: NextFunction){
        try{
            const reportedVehicleId = req.params.reportedVehicleId as string
            const reportedVehicle = await reportedVehicleService.delete(reportedVehicleId)
            res.status(StatusCodeEnum.OK).json(await reportedVehiclePresenter.staffRes(reportedVehicle))
        }
        catch(e){
            next(e)
        }
    }

}

export const reportedVehicleController = new ReportedVehicleController()