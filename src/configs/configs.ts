import dotenv from "dotenv"
import type {ObjectCannedACL} from "@aws-sdk/client-s3";

dotenv.config()

type configsType = {
    APP_PORT: string,
    APP_HOST: string,
    MONGO_URI: string,
    JWT_ACCESS_SECRET: string,
    JWT_REFRESH_SECRET: string,
    JWT_ACTIVATE_SECRET: string,
    JWT_RECOVERY_SECRET: string,
    JWT_ACCESS_LIFETIME: any,
    JWT_REFRESH_LIFETIME: any,
    JWT_ACTIVATE_LIFETIME: any,
    JWT_RECOVERY_LIFETIME: any,
    SMTP_EMAIL: string,
    SMTP_PASSWORD: string,
    PRIVATBANK_API: string,
    AWS_ACCESS_KEY: string,
    AWS_SECRET_KEY: string,
    AWS_S3_BUCKET_NAME: string,
    AWS_S3_REGION: string,
    AWS_S3_ACL: ObjectCannedACL
}

export const configs: configsType = {
    APP_PORT: process.env.APP_PORT as string,
    APP_HOST: process.env.APP_HOST as string,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET as string,
    JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET as string,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
    JWT_ACTIVATE_LIFETIME: process.env.JWT_ACTIVATE_LIFETIME,
    JWT_RECOVERY_LIFETIME: process.env.JWT_RECOVERY_LIFETIME,
    SMTP_EMAIL: process.env.SMTP_EMAIL as string,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,
    PRIVATBANK_API: process.env.PRIVATBANK_API as string,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY as string,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME as string,
    AWS_S3_REGION: process.env.AWS_S3_REGION as string,
    AWS_S3_ACL: process.env.AWS_S3_ACL as ObjectCannedACL
}