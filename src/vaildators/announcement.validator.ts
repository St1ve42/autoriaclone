import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import joi from "joi"
import {AnnouncementRegexpEnum} from "../enums/announcementEnums/announcement.regexp.enum.ts";
import {isObjectIdOrHexString} from "mongoose";
import {announcementRepository} from "../repository/announcement.repository.ts";
import {vehicleRepository} from "../repository/vehicle.repository.ts";

export class AnnouncementValidator {
    private static title = joi.string().pattern(AnnouncementRegexpEnum.TITLE)
    private static description = joi.string().min(30).max(2000)
    private static city = joi.string().pattern(AnnouncementRegexpEnum.CITY)
    private static region = joi.string().pattern(AnnouncementRegexpEnum.REGION)
    private static price = joi.number().min(0)
    private static currency = joi.string().valid(...Object.values(CurrencyEnum))
    private static vehicle_id = joi.string().custom((value, helpers) => {
        if(!isObjectIdOrHexString(value)){
            return helpers.error("string.objectId")
        }
        return value
    }).external(async(value, helpers) => {
        const announcements = await announcementRepository.findByParams({vehicle_id: value})
        if(!await vehicleRepository.get(value)){
            return helpers.message("Vehicle not found") //fix error code
        }
        else if(announcements && announcements.length !== 0){
            return helpers.message("Vehicle with this id is already pinned to another announcement.") //fix error code
        }
    }).messages(({
        'string.objectId': '{{#label}} is incorrect id.'
    }))
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
        vehicle_id: this.vehicle_id.required(),
        dealershipId: this.dealershipId
    })

    public static updateAnnouncement = joi.object({
        title: this.title,
        description: this.description,
        city: this.city,
        region: this.region,
        price: this.price,
        currency: this.currency
    })
}