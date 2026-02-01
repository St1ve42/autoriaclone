import {UploadedFile} from "express-fileupload";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {Utils} from "../utils/utils.ts";
import {FileConfigType} from "../types/FileConfigType.ts";

export class FileValidator{
    public static validateFile(file: UploadedFile, config: FileConfigType): {message: string, status: number} | null{
        const status = StatusCodeEnum.BAD_REQUEST
        if(!file){
            return {message: "Відсутній файл", status}
        }
        else if(!config.mimeTypes.includes(file.mimetype)){
            return {message: `Зображення '${file.name}' має недозволений формат. Тільки ${Utils.getStringOfArrayElements(config.mimeTypes.map(mimeType => mimeType.split('/')[1]))} є дозволені`, status}
        }
        else if(file.size > config.size){
            return {message: `Зображення '${file.name}' перевищує ліміт розміру: ${config.size / 1024**2} МБ`, status}
        }
        return null
    }
}