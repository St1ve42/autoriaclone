import type {Request, Response, NextFunction} from "express"
import {ApiError} from "../errors/api.error.ts";
class ErrorController{
    public async showError(error: Error | ApiError, req: Request, res: Response, next: NextFunction){
        console.log(error)
        const status = error instanceof ApiError ? error.status : 500
        res.status(status).json({
            status,
            message: error.message
        })
    }

    public async showNonExistentApiError (req: Request, res: Response, next: NextFunction){
        res.status(400).json({
            status: 400,
            message: "No existent API route or method"
        })
    }


}

export const errorController = new ErrorController()