import type {NextFunction, Request, Response} from "express";
import type {UserCreateDTOType} from "../types/UserType.ts";
import {authService} from "../services/auth.service.ts";
import {userPresenter} from "../presenters/user.presenter.ts";
import type {SignInType} from "../types/AuthType.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class AuthController{

    public async signUp (req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as UserCreateDTOType
            const {user, tokenPair} = await authService.signUp(body)
            res.status(StatusCodeEnum.CREATED).json(await userPresenter.resWithTokenPair(user, tokenPair))
        }
        catch(e){
            next(e)
        }
    }

    public async signIn (req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as SignInType
            const {user, tokenPair} = await authService.signIn(body)
            res.status(StatusCodeEnum.OK).json(await userPresenter.resWithTokenPair(user, tokenPair))
        }
        catch(e){
            next(e)
        }
    }

    public async refresh (_req: Request, res: Response, next: NextFunction){
        try{
            const {payload, token_id} = res.locals as {payload: TokenPayloadType} & {token_id: string }
            const tokenPair = await authService.refresh(payload, token_id)
            res.status(StatusCodeEnum.CREATED).json(userPresenter.resToken(tokenPair))
        }
        catch(e){
            next(e)
        }
    }

    public async logOut (req: Request, res: Response, next: NextFunction){
        try{
            const token = res.locals.token as string
            await authService.logOut(token)
            res.status(StatusCodeEnum.NO_CONTENT).json()
        }
        catch(e){
            next(e)
        }
    }

    public async logOutAll (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            await authService.logOutAll(user_id)
            res.status(StatusCodeEnum.NO_CONTENT).json()
        }
        catch(e){
            next(e)
        }
    }

    public async activate (req: Request, res: Response, next: NextFunction){
        try{
            const token = req.params.token as string
            const user = await authService.activate(token)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async recoveryRequest (req: Request, res: Response, next: NextFunction){
        try{
            const email = req.body.email as string
            await authService.recoveryRequest(email)
            res.status(StatusCodeEnum.OK).json({
                message: "Check your email"
            })
        }
        catch(e){
            next(e)
        }
    }

    public async recovery (req: Request, res: Response, next: NextFunction){
        try{
            const token = req.params.token as string
            const password = req.body.password as string
            const user = await authService.recovery(password, token)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }

    public async change (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const body = req.body as Record<"password" | "oldPassword", string>
            const user = await authService.change(body, user_id)
            res.status(StatusCodeEnum.OK).json(await userPresenter.res(user))
        }
        catch(e){
            next(e)
        }
    }



}

export const authController = new AuthController()
