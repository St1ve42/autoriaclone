import dotenv from "dotenv"

dotenv.config()

type configsType = {
    APP_PORT: string,
    APP_HOST: string,
    JWT_ACCESS_SECRET: string,
    JWT_REFRESH_SECRET: string,
    JWT_ACTIVATE_SECRET: string,
    JWT_RECOVERY_SECRET: string,
    JWT_ACCESS_LIFETIME: any,
    JWT_REFRESH_LIFETIME: any,
    JWT_ACTIVATE_LIFETIME: any,
    JWT_RECOVERY_LIFETIME: any
}

export const configs: configsType = {
    APP_PORT: process.env.APP_PORT as string,
    APP_HOST: process.env.APP_HOST as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET as string,
    JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET as string,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
    JWT_ACTIVATE_LIFETIME: process.env.JWT_ACTIVATE_LIFETIME,
    JWT_RECOVERY_LIFETIME: process.env.JWT_RECOVERY_LIFETIME,
}