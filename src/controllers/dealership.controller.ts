import type {Request, Response, NextFunction} from "express";
import {DealershipCreateWithInputDTOType} from "../types/DealershipType.ts";
import {dealerShipService} from "../services/dealership.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {dealershipPresenter} from "../presenters/dealership.presenter.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {UploadedFile} from "express-fileupload";
import {dealershipReviewService} from "../services/dealership.review.service.ts";
import {DealershipReviewCreateDTOType} from "../types/DealershipReviewType.ts";
import {dealershipReviewPresenter} from "../presenters/dealership.review.presenter.ts";
import {dealershipMemberService} from "../services/dealership.member.service.ts";
import {dealershipMemberPresenter} from "../presenters/dealership.member.presenter.ts";
import {DealershipMemberAddDTOType, DealershipMemberUpdateDTOType} from "../types/DealershipMemberType.ts";
import {userService} from "../services/user.service.ts";
import {announcementService} from "../services/announcement.service.ts";
import {announcementPresenter} from "../presenters/announcement.presenter.ts";
import {AnnouncementQueryType} from "../types/QueryType.ts";
import {AnnouncementStatusEnum} from "../enums/announcementEnums/announcement.status.enum.ts";

class DealershipController{
    public async create (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const body = req.body as DealershipCreateWithInputDTOType
            const {user_id} = res.locals.payload as TokenPayloadType
            const dealership = await dealerShipService.create(body, user_id)
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async get (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.get(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async getList (_req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealership = await dealerShipService.getList()
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.list(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async delete (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.delete(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
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
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
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
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async deleteLogo (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.deleteLogo(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async verify (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.verify(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async unverify (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const dealership = await dealerShipService.unverify(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(await dealershipPresenter.res(dealership))
        }
        catch(e){
            next(e)
        }
    }

    public async createReview (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const dealershipId = req.params.dealershipId as string
            const body = req.body as DealershipReviewCreateDTOType
            const review = await dealershipReviewService.create(body, dealershipId, user_id)
            res.status(StatusCodeEnum.CREATED).json(await dealershipReviewPresenter.res(review))
        }
        catch(e){
            next(e)
        }
    }

    public async getReviews (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const reviews = await dealershipReviewService.getByDealershipId(dealershipId)
            res.status(StatusCodeEnum.CREATED).json(await dealershipReviewPresenter.list(reviews))
        }
        catch(e){
            next(e)
        }
    }

    public async getMembers (req: Request, res: Response, next: NextFunction){
        try{
            const dealershipId = req.params.dealershipId as string
            const members = await dealershipMemberService.getMembersByDealershipId(dealershipId)
            res.status(StatusCodeEnum.OK).json(await dealershipMemberPresenter.list(members))
        }
        catch(e){
            next(e)
        }
    }

    public async getMember (req: Request, res: Response, next: NextFunction){
        try{
            const memberId = req.params.memberId as string
            const member = await dealershipMemberService.get(memberId)
            res.status(StatusCodeEnum.OK).json(await dealershipMemberPresenter.res(member))
        }
        catch(e){
            next(e)
        }
    }

    public async addMember (req: Request, res: Response, next: NextFunction){
        try{
            const dealershipId = req.params.dealershipId as string
            const body = req.body as DealershipMemberAddDTOType
            const member = await dealershipMemberService.addMember(dealershipId, body)
            res.status(StatusCodeEnum.OK).json(await dealershipMemberPresenter.res(member))
        }
        catch(e){
            next(e)
        }
    }

    public async deleteMember (req: Request, res: Response, next: NextFunction){
        try{
            const dealershipId = req.params.dealershipId as string
            const memberId = req.params.memberId as string
            const member = await dealershipMemberService.deleteMember(dealershipId, memberId)
            res.status(StatusCodeEnum.OK).json(await dealershipMemberPresenter.res(member))
        }
        catch(e){
            next(e)
        }
    }

    public async updateMember (req: Request, res: Response, next: NextFunction){
        try{
            const dealershipId = req.params.dealershipId as string
            const memberId = req.params.memberId as string
            const body = req.body as DealershipMemberUpdateDTOType
            const member = await dealershipMemberService.update(dealershipId, memberId, body)
            res.status(StatusCodeEnum.OK).json(await dealershipMemberPresenter.res(member))
        }
        catch(e){
            next(e)
        }
    }

    public async getAnnouncements (req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as AnnouncementQueryType
            const dealershipId = req.params.dealershipId as string
            const [announcements, total] = await announcementService.getList(query, {dealership_id: dealershipId, status: AnnouncementStatusEnum.ACTIVE})
            res.status(StatusCodeEnum.OK).json(await announcementPresenter.userList(announcements, total, query))
        }
        catch(e){
            next(e)
        }
    }


}

export const dealershipController = new DealershipController()

//TODO average dealership rating
//TODO make dealershipMember repository
//TODO add owner to dealershipMember db
//TODO allow owner to assign manager role
//TODO think about how to join to dealership
//TODO join where dealership and its children tables are related
