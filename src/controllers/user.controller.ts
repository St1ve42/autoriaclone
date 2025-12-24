import type {Request, Response, NextFunction} from "express";
import {userService} from "../services/user.service.ts";
import type {UserCreateDTOType, UserUpdateDTOType} from "../types/UserType.ts";
import {userPresenter} from "../presenters/user.presenter.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {UserQueryType} from "../types/QueryType.ts";
import {UploadedFile} from "express-fileupload";
import {TokenPayloadType} from "../types/TokenType.ts";
import {BanType} from "../types/BanType.ts";
import {PlanSubscribeEnum} from "../../prisma/src/generated/prisma/enums.ts";


class UserController{
    public async getAll(req: Request, res: Response, next: NextFunction){
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
            const {userId} = req.params as {userId: string}
            const user = await userService.get(userId)
            console.log(user)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as UserCreateDTOType
            const {region_id} = res.locals as {region_id: number}
            const user = await userService.create(body, region_id)
            res.status(StatusCodeEnum.CREATED).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {userId} = req.params as {userId: string}
            const user = await userService.delete(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        try{
            const {userId} = req.params as {userId: string}
            const body = req.body as UserUpdateDTOType
            const locals = res.locals as Partial<Record<"role_id" | "region_id", number>>
            const user = await userService.update(userId, body, locals)
            res.status(200).json(await userPresenter.res(user))
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

    public async deleteAvatar (req: Request, res: Response, next: NextFunction){
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
            const {userId} = req.params as {userId: string}
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
            const {userId} = req.params as {userId: string}
            const user = await userService.unban(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async activate (req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params as { userId: string }
            const user = await userService.activate(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }

    }

    public async deactivate (req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params as { userId: string }
            const user = await userService.deactivate(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }

    }

    public async setManager (req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params as { userId: string }
            const user = await userService.setManager(userId)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        } catch (e) {
            next(e)
        }

    }

    public async buySubscribe (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const {code} = req.body as {code: PlanSubscribeEnum}
            const purchase = await userService.buySubscribe(user_id, code)
            res.status(StatusCodeEnum.OK).json(purchase)
        }
        catch(e){
            next(e)
        }
    }



}

export const userController = new UserController()