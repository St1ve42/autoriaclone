import {EmailEnum} from "../enums/generalEnums/email.enum.ts";

export const emailConstants = {
    [EmailEnum.WELCOME]: {
        subject: "Welcome to our platform",
        template: "welcome"
    },
    [EmailEnum.FORGOT_PASSWORD]: {
        subject: "Forgot password",
        template: "forgot.password"
    }
}