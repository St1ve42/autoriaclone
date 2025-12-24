import joi from "joi";
import {BanRegexpEnum} from "../enums/userEnums/user.ban.regexp.enum.ts";

export class BanValidator{
    private static time = joi.string().pattern(BanRegexpEnum.TIME)
    private static reason = joi.string().pattern(BanRegexpEnum.REASON)

    public static validator = joi.object({
        time: this.time,
        reason: this.reason
    })
}