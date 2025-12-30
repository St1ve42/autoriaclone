import type {NextFunction, Request, Response} from "express";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {announcementPresenter} from "../presenters/announcement.presenter.ts";
import type {AnnouncementType, CreateAnnouncementDTOType} from "../types/AnnouncementType.ts";
import {announcementService} from "../services/announcement.service.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {UploadedFile} from "express-fileupload";
import {AnnouncementQueryType} from "../types/QueryType.ts";
import {announcementStatisticsService} from "../services/announcement.statistics.service.ts";
import {statisticsPresenter} from "../presenters/statistics.presenter.ts";

class AnnouncementController{
    public async getList(req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as AnnouncementQueryType
            const [announcements, total] = await announcementService.getList(query)
            res.status(StatusCodeEnum.OK).json(await announcementPresenter.list(announcements, total, query))
        }
        catch(e){
            next(e)
        }
    }

    public async get(req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId as string
            const announcement = await announcementService.get(announcementId)
            res.status(StatusCodeEnum.OK).json(await announcementPresenter.res(announcement))
        }
        catch(e){
            next(e)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as CreateAnnouncementDTOType
            const {user_id} = res.locals.payload as TokenPayloadType
            const announcement = await announcementService.create(body, user_id)
            res.status(StatusCodeEnum.CREATED).json(await announcementPresenter.res(announcement))
        }
        catch(e){
            next(e)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId as string
            const announcement = await announcementService.delete(announcementId)
            res.status(StatusCodeEnum.OK).json(await announcementPresenter.res(announcement))
        }
        catch(e){
            next(e)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId as string
            const body = req.body as AnnouncementType
            const announcement = await announcementService.update(announcementId, body)
            res.status(200).json(await announcementPresenter.res(announcement))
        }
        catch(e){
            next(e)
        }
    }

    public async upload (req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId as string
            const files = req.files?.images as UploadedFile[] | UploadedFile
            const announcement = await announcementService.upload(announcementId, Array.isArray(files) ? files : [files])
            res.status(StatusCodeEnum.OK).json(await announcementPresenter.res(announcement))

        }
        catch(e){
            next(e)
        }
    }

    public async deleteImages (req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId as string
            const {images} = req.body as {images: string[]}
            const announcement = await announcementService.deleteImages(announcementId, images)
            res.status(StatusCodeEnum.OK).json(await announcementPresenter.res(announcement))

        }
        catch(e){
            next(e)
        }
    }

    public async getStatistics (req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId as string
            const statistics = await announcementStatisticsService.get(announcementId)
            res.status(StatusCodeEnum.OK).json(statisticsPresenter.res(statistics))
        }
        catch(e){
            next(e)
        }
    }

    public async increaseViews (req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId as string
            const statistics = await announcementStatisticsService.increaseViewCount(announcementId)
            res.status(StatusCodeEnum.OK).json(statisticsPresenter.res(statistics))
        }
        catch(e){
            next(e)
        }
    }




}

export const announcementController = new AnnouncementController()