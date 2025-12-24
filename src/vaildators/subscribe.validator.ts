import joi from "joi";
import {PlanSubscribeEnum} from "../../prisma/src/generated/prisma/enums.ts";

export class SubscribeValidator{
    private static price = joi.number()
    private static duration = joi.number()

    private static baseValidator = {
        code: joi.string().valid(...Object.values(PlanSubscribeEnum)).required()
    }

    public static validator = joi.object({
        ...this.baseValidator
    })

    public static priceValidator = joi.object({
        ...this.baseValidator,
        price: this.price.required()
    })

    public static durationValidator = joi.object({
        ...this.baseValidator,
        duration: this.duration.required()
    })
}