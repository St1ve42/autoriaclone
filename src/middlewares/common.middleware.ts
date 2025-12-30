import joi from "joi";
import type {Request, Response, NextFunction} from "express";
import {ApiError} from "../errors/api.error.ts";
import {isObjectIdOrHexString} from "mongoose";
import {validate} from "uuid";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {Utils} from "../utils/utils.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {userService} from "../services/user.service.ts";
import {ReadableServiceType} from "../types/ReadableServiceType.ts";
import {joiOptions} from "../constants/joi.constants.ts";

class CommonMiddleware{
    public validateBody(validator: joi.ObjectSchema){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                if(!req.body){
                    throw new ApiError("Body is required", StatusCodeEnum.BAD_REQUEST)
                }
                req.body = await validator.validateAsync(req.body, joiOptions)
                next()
            }
            catch(e){
                if(e instanceof joi.ValidationError){
                    throw new ApiError(e.details[0].message, StatusCodeEnum.BAD_REQUEST)
                }
                next(e)
            }
        }

    }

    public validateId(idParamName: string, db: "mysql" | "mongo"){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                if(db === "mongo" && !isObjectIdOrHexString(req.params[idParamName]) || db === "mysql" && !validate(req.params[idParamName])) throw new ApiError("Not correct id", StatusCodeEnum.BAD_REQUEST)
                next()
            }
            catch(e){
                next(e)
            }
        }

    }

    public validateQuery(validator: joi.ObjectSchema){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                Utils.makeQueryWritable(req)
                req.query = await validator.validateAsync(req.query)
                next()
            }
            catch(e){
                if(e instanceof joi.ValidationError){
                    throw new ApiError(e.details[0].message, StatusCodeEnum.BAD_REQUEST)
                }
                next(e)
            }
        }

    }

    public validatePermission(permission: string){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const {user_id} = res.locals.payload as TokenPayloadType
                const isHasPermission = await userService.isHasPermission(user_id, permission)
                if(!isHasPermission){
                    throw new ApiError("Not authorized", StatusCodeEnum.FORBIDDEN)
                }
                next()
            }
            catch(e){
                next(e)
            }
        }
    }

    public validateEntityExisting<T>(service: ReadableServiceType<T>, entityName: string, idParamName: string){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const id = req.params[idParamName] as string
                const entity = await service.get(id)
                if(!entity){
                    throw new ApiError(`${entityName} not found`, StatusCodeEnum.NOT_FOUND)
                }
                next()
            }
            catch(e){
                next(e)
            }
        }
    }

}

export const commonMiddleware = new CommonMiddleware()