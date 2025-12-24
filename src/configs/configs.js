import dotenv from "dotenv";
dotenv.config();
export const configs = {
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
    JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
    JWT_ACTIVATE_LIFETIME: process.env.JWT_ACTIVATE_LIFETIME,
    JWT_RECOVERY_LIFETIME: process.env.JWT_RECOVERY_LIFETIME,
};
//# sourceMappingURL=configs.js.map