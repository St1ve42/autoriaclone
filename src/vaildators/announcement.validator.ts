import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import joi from "joi"
import {AnnouncementRegexpEnum} from "../enums/announcementEnums/announcement.regexp.enum.ts";
import {isObjectIdOrHexString} from "mongoose";
import {VehicleValidator} from "./vehicle.validator.ts";

export class AnnouncementValidator {
    private static title = joi.string().pattern(AnnouncementRegexpEnum.TITLE)
    private static description = joi.string().min(30).max(2000)
    private static city = joi.string().pattern(AnnouncementRegexpEnum.CITY)
    private static region = joi.string().pattern(AnnouncementRegexpEnum.REGION)
    private static price = joi.number().min(0)
    private static currency = joi.string().valid(...Object.values(CurrencyEnum))
    private static dealershipId = joi.string().custom((value, helpers) => {
        if(!isObjectIdOrHexString(value)){
            return helpers.error("string.objectId")
        }
        return value
    })

    public static createAnnouncement = joi.object({
        title: this.title.required(),
        description: this.description.required(),
        city: this.city.required(),
        region: this.region.required(),
        price: this.price.required(),
        currency: this.currency.required(),
        vehicle: VehicleValidator.createVehicle.required(),
        dealershipId: this.dealershipId
    })

    public static updateAnnouncement = joi.object({
        title: this.title,
        description: this.description,
        city: this.city,
        region: this.region,
        price: this.price,
        currency: this.currency,
        vehicle: VehicleValidator.updateVehicle
    })
}