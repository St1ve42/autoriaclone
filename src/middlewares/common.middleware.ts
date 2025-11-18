import joi from "joi";
import type {Request, Response, NextFunction} from "express";
import {ApiError} from "../errors/api.error.ts";
import {isObjectIdOrHexString} from "mongoose";
import {validate} from "uuid";

class CommonMiddleware{
    public validateBody(validator: joi.ObjectSchema){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                req.body = await validator.validateAsync(req.body)
                next()
            }
            catch(e){
                if(e instanceof joi.ValidationError){
                    throw new ApiError(e.details[0].message, 400)
                }
                next(e)
            }
        }

    }

    public validateId(idParamName: string, db: "mysql" | "mongodb"){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                if(db === "mongodb" && !isObjectIdOrHexString(req.params[idParamName]) || db === "mysql" && !validate(req.params[idParamName])) throw new ApiError("Not correct id", 400)
                next()
            }
            catch(e){
                next(e)
            }
        }

    }


}

export const commonMiddleware = new CommonMiddleware()