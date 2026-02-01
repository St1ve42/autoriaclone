import type {Request, Response, NextFunction} from "express";
import {userService} from "../services/user.service.ts";
import type {UserCreateDTOType, UserUpdateDTOType} from "../types/UserType.ts";
import {userPresenter} from "../presenters/user.presenter.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {AnnouncementQueryType, DealershipReviewQueryType, UserQueryType} from "../types/QueryType.ts";
import {UploadedFile} from "express-fileupload";
import {TokenPayloadType} from "../types/TokenType.ts";
import {BanType} from "../types/BanType.ts";
import {dealershipMemberService} from "../services/dealership.member.service.ts";
import {dealershipMemberPresenter} from "../presenters/dealership.member.presenter.ts";
import {announcementService} from "../services/announcement.service.ts";
import {announcementPresenter} from "../presenters/announcement.presenter.ts";
import {subscriptionPurchaseService} from "../services/subscription.purchase.service.ts";
import {subscriptionPurchasePresenter} from "../presenters/subscription.purchase.presenter.ts";
import {dealershipReviewPresenter} from "../presenters/dealership.review.presenter.ts";
import {dealershipReviewService} from "../services/dealership.review.service.ts";


class UserController{
    public async getList(req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as UserQueryType
            const [users, total] = await userService.getList(query)
            res.status(StatusCodeEnum.OK).json(await userPresenter.list(users, total, query))
        }
        catch(e){
            next(e)
        }
    }

    public async get(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.userId as string
            const user = await userService.get(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as UserCreateDTOType
            const user = await userService.create(body)
            res.status(StatusCodeEnum.CREATED).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.userId as string
            const body = req.body as UserUpdateDTOType
            const user = await userService.update(userId, body)
            res.status(200).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.userId as string
            const user = await userService.delete(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async getMe (_req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const user = await userService.get(user_id)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async updateMe (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const body = req.body as UserUpdateDTOType
            const user = await userService.update(user_id, body)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async deleteMe (_req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const user = await userService.deleteMe(user_id)
            res.status(StatusCodeEnum.OK).json(user)
        }
        catch(e){
            next(e)
        }
    }

    public async uploadAvatar (req: Request, res: Response, next: NextFunction){
        try{
            const file = req.files?.["avatar"] as UploadedFile
            const {user_id} = res.locals.payload as TokenPayloadType
            const user = await userService.uploadAvatar(file, user_id)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async deleteAvatar (_req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const user = await userService.deleteAvatar(user_id)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async ban (req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.userId as string
            const body = req.body as BanType
            const user = await userService.ban(userId, body)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async unban (req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.params.userId as string
            const user = await userService.unban(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async activate (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const user = await userService.activate(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }

    }

    public async deactivate (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const user = await userService.deactivate(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }

    }

    public async verify (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const user = await userService.verify(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }

    }

    public async unverify (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const user = await userService.unverify(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }

    }

    public async assignManager (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const user = await userService.assignManager(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }
    }

    public async unassignManager (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const user = await userService.unassignManager(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }
    }

    public async getMembership (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const membership = await dealershipMemberService.getUserMembership(user_id)
            res.status(StatusCodeEnum.OK).json(await dealershipMemberPresenter.resToUser(membership))
        }
        catch(e){
            next(e)
        }
    }

    public async getAnnouncementList (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const query = req.query as unknown as AnnouncementQueryType
            const [announcements, total] = await announcementService.getList(query, {user_id})
            res.status(StatusCodeEnum.OK).json(await announcementPresenter.userList(announcements, total, query))
        }
        catch(e){
            next(e)
        }
    }

    public async getSubscription (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const purchase = await subscriptionPurchaseService.findOneByParams({user_id})
            res.status(StatusCodeEnum.OK).json(subscriptionPurchasePresenter.userSubscriptionPurchaseRes(purchase))
        }
        catch(e){
            next(e)
        }
    }

    public async getReviews (req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as DealershipReviewQueryType
            const {user_id} = res.locals.payload as TokenPayloadType
            const [reviews, total] = await dealershipReviewService.getList(query, {author_id: user_id})
            res.status(StatusCodeEnum.OK).json(await dealershipReviewPresenter.userList(reviews, total, query))
        }
        catch(e){
            next(e)
        }
    }


}

export const userController = new UserController()




