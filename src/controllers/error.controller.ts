import type {Request, Response, NextFunction} from "express"
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
class ErrorController{
    public async showError(error: Error | ApiError, req: Request, res: Response, next: NextFunction){
        console.log(error)
        const status = error instanceof ApiError ? error.status : StatusCodeEnum.INTERNAL_SERVER_ERROR
        res.status(status).json({
            status,
            message: error.message
        })
    }

    public async showNonExistentApiError (req: Request, res: Response, next: NextFunction){
        res.status(StatusCodeEnum.BAD_REQUEST).json({
            status: StatusCodeEnum.BAD_REQUEST,
            message: "No existent API route or method"
        })
    }


}

export const errorController = new ErrorController()