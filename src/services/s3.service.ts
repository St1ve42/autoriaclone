import {configs} from "../configs/configs.ts";
import {DeleteObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {FileItemTypeEnum} from "../enums/generalEnums/FileEnum.ts";
import {randomUUID} from "node:crypto";
import {UploadedFile} from "express-fileupload";
import path from "node:path";

class S3Service{
    private readonly client;

    constructor() {
        this.client = new S3Client({
            region: configs.AWS_S3_REGION,
            credentials: {
                accessKeyId: configs.AWS_ACCESS_KEY,
                secretAccessKey: configs.AWS_SECRET_KEY
            }
        })
    }

    public async uploadFile(itemType: FileItemTypeEnum, itemId: string, file: UploadedFile): Promise<string>{
        const {name, data, mimetype} = file
        const path = this.buildPath(itemType, itemId, name)
        await this.client.send(
            new PutObjectCommand({
                Bucket: configs.AWS_S3_BUCKET_NAME,
                Key: path,
                Body: data,
                ContentType: mimetype,
                ACL: configs.AWS_S3_ACL
            })
        )
        return path
    }

    public async deleteFile(filePath: string): Promise<void>{
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: configs.AWS_S3_BUCKET_NAME,
                Key: filePath,
            })
        )
    }

    private buildPath(itemType: FileItemTypeEnum, itemId: string, fileName: string){
        return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`
    }

}

export const s3Service = new S3Service()