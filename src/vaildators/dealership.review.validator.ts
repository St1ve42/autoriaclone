import joi from "joi";
import {isObjectIdOrHexString} from "mongoose";
import {dealerShipService} from "../services/dealership.service.ts";

export class DealershipReviewValidator{
    private static rating = joi.number().integer().min(0).max(10)
    private static text = joi.string().min(50).max(500)

    public static createValidator = joi.object({
        rating: this.rating.required(),
        text: this.text.required()
    })

    public static updateValidator = joi.object({
        rating: this.rating,
        text: this.text
    })

    private static dealershipReviewSearchRules = {
        dealership_id: joi.string().trim().external(async (value, helpers) => {
            if(!isObjectIdOrHexString(value)){
                return helpers.message("Значення dealershipId є некоректним")
            }
            const dealership = await dealerShipService.get(value)
            if(!dealership){
                return helpers.message("Автосалон не знайдено")
            }
        })
    }

    public static dealershipReviewSearchCases = Object.entries(this.dealershipReviewSearchRules).map(([key, schema]) => ({
        is: key,
        then: schema
    }))

}