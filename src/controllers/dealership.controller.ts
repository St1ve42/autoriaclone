import type {Request, Response, NextFunction} from "express";
import {DealershipCreateWithInputDTOType} from "../types/DealershipType.ts";
import {dealerShipService} from "../services/dealership.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {dealershipPresenter} from "../presenters/dealership.presenter.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {UploadedFile} from "express-fileupload";

class DealershipController{
    public async create (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const body = req.body as DealershipCreateWithInputDTOType
            const {user_id} = res.locals.payload as TokenPayloadType
            const dealership = await dealerShipService.create(body, user_id)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async get (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.get(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async getList (_req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealership = await dealerShipService.getList()
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.listRes(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async delete (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.delete(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async update (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const body = req.body as DealershipCreateWithInputDTOType
            const dealership = await dealerShipService.update(dealershipId, body)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async uploadLogo (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const logo = req.files?.logo as UploadedFile
            const dealership = await dealerShipService.uploadLogo(dealershipId, logo)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async deleteLogo (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.deleteLogo(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async verify (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.verify(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async unverify (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.unverify(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }





}

export const dealershipController = new DealershipController()