import dotenv from "dotenv"

dotenv.config()

type configsType = {
    APP_PORT: number,
    APP_HOST: string
}

export const configs: configsType = {
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST
}