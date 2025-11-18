import type {Request, Response, NextFunction} from "express";
import {userService} from "../service/user.service.ts";
import type {UserCreateDTOType, UserUpdateDTOType} from "../types/UserType.ts";
import {userPresenter} from "../presenters/user.presenter.ts";

class UserController{
    public async getUsers(req: Request, res: Response, next: NextFunction){
        try{
            const users = await userService.getUsers()
            res.status(200).json(await userPresenter.toListResDto(users))
        }
        catch(e){
            next(e)
        }
    }

    public async getUser(req: Request, res: Response, next: NextFunction){
        try{
            const {userId} = req.params as {userId: string}
            const user = await userService.getUser(userId)
            res.status(200).json(await userPresenter.resUser(user))
        }
        catch(e){
            next(e)
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as UserCreateDTOType
            const {region_id} = res.locals as {region_id: number}
            const user = await userService.createUser(body, region_id)
            res.status(201).json(await userPresenter.resUser(user))
        }
        catch(e){
            next(e)
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction){
        try{
            const {userId} = req.params as {userId: string}
            const user = await userService.deleteUser(userId)
            res.status(200).json(await userPresenter.resUser(user))
        }
        catch(e){
            next(e)
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction){
        try{
            const {userId} = req.params as {userId: string}
            const body = req.body as UserUpdateDTOType
            const user = await userService.updateUser(userId, body)
            res.status(200).json(await userPresenter.resUser(user))
        }
        catch(e){
            next(e)
        }
    }




}

export const userController = new UserController()