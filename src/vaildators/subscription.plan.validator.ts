import joi from "joi";
import {subscriptionPlanService} from "../services/subscription.plan.service.ts";
import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import {SubscriptionCodeEnum} from "../enums/SubcriptionCodeEnum/subscription.code.enum.ts";

export class SubscriptionPlanValidator {
    private static price = joi.number().min(0)
    private static duration = joi.number().min(0)
    private static currency = joi.string().trim().valid(...Object.values(CurrencyEnum))
    private static code = joi.string().trim().external(async (value, helpers) => {
        if(value){
            const subscription = await subscriptionPlanService.findOneByParam({code: value})
            if(subscription){
                return helpers.error("any.conflict")
            }
        }
    })

    public static createValidator = joi.object({
        code: this.code.required(),
        price: this.price.required(),
        currency: this.currency,
        duration: this.duration
    })

    public static updateValidator = joi.object({
        code: this.code,
        price: this.price,
        currency: this.currency,
        duration: this.duration
    }).min(1)
}