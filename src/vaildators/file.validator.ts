import {UploadedFile} from "express-fileupload";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {Utils} from "../utils/utils.ts";
import {FileConfigType} from "../types/FileConfigType.ts";

export class FileValidator{
    public static validateFile(file: UploadedFile, config: FileConfigType): {message: string, status: number} | null{
        if(!file){
            return {message: "No provided file", status: StatusCodeEnum.BAD_REQUEST}
        }
        else if(!config.mimeTypes.includes(file.mimetype)){
            return {message: `Image '${file.name}' has not allowed file format. Only ${Utils.getStringOfArrayElements(config.mimeTypes.map(mimeType => mimeType.split('/')[1]))} are allowed`, status: StatusCodeEnum.BAD_REQUEST}
        }
        else if(file.size > config.size){
            return {message: `Image '${file.name}' is too large`, status: StatusCodeEnum.BAD_REQUEST}
        }
        return null
    }
}