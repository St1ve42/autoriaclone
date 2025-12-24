import {EmailEnum} from "../enums/generalEnums/email.enum.js";

type EmailCombinedType = Partial<Record<"name" | "surname" | "email" | "action_token" | "app_host" | "app_port", string>>

export type EmailPayloadType = {
    [EmailEnum.WELCOME]: Pick<EmailCombinedType, "name" | "surname" | "action_token" | "app_host" | "app_port">
    [EmailEnum.FORGOT_PASSWORD]: Pick<EmailCombinedType, "action_token" | "app_host" | "app_port">
}