import joi from "joi";
import {BanRegexpEnum} from "../enums/userEnums/user.ban.regexp.enum.ts";

export class BanValidator{
    private static time = joi.string().pattern(BanRegexpEnum.TIME).messages({
        "string.base.pattern": "{{$field}} має мати вигляд \'[value][unit]\', де [value] - довільне число, [unit] - одиниця часу, яке приймає наступні значення: y,w,d,h,m,s " +
            "(y - рік, w - тиждень, d - день, h - година, m - хвилина, s - секунда)"
    })
    private static reason = joi.string().pattern(BanRegexpEnum.REASON).messages({
        "string.pattern.base": "{{#field}} повинно містити тільки кирилицю та числа і бути довжиною від 3 до 100"
    })

    public static validator = joi.object({
        time: this.time,
        reason: this.reason
    })
}