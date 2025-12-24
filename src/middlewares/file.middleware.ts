import {FileConfigType} from "../types/FileConfigType.ts";
import {Request, Response, NextFunction} from "express";
import {UploadedFile} from "express-fileupload";
import {ApiError} from "../errors/api.error.ts";
import {FileValidator} from "../vaildators/file.validator.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class FileMiddleware{
    public validateFile(key: string, config: FileConfigType){
        return (req: Request, res: Response, next: NextFunction) => {
            try{
                const file = req.files?.[key] as UploadedFile | UploadedFile[]
                if(Array.isArray(file)){
                    throw new ApiError("Only one file is allowed", StatusCodeEnum.BAD_REQUEST)
                }
                const errorArgs = FileValidator.validateFile(file, config)
                if(errorArgs){
                    throw new ApiError(errorArgs.message, errorArgs.status)
                }
                next()
            }
            catch(e){
                next(e)
            }
        }
    }

    public validateManyFiles(key: string, config: FileConfigType){
        return (req: Request, res: Response, next: NextFunction) => {
            try{
                let files = req.files?.[key] as UploadedFile[] | UploadedFile
                files = Array.isArray(files) ? files : [files]
                files.forEach(file => {
                    const errorArgs = FileValidator.validateFile(file, config)
                    if(errorArgs){
                        throw new ApiError(errorArgs.message, errorArgs.status)
                    }
                })
                next()
            }
            catch(e){
                next(e)
            }
        }
    }
}

export const fileMiddleware = new FileMiddleware()