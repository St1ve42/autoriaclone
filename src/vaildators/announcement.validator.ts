import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import joi from "joi"
import {AnnouncementRegexpEnum} from "../enums/announcementEnums/announcement.regexp.enum.ts";
import {isObjectIdOrHexString} from "mongoose";
import {VehicleValidator} from "./vehicle.validator.ts";
import {regionRepository} from "../repository/region.repository.ts";
import {AnnouncementStatusEnum} from "../enums/announcementEnums/announcement.status.enum.ts";

export class AnnouncementValidator {
    private static title = joi.string().pattern(AnnouncementRegexpEnum.TITLE)
    private static description = joi.string().min(30).max(2000)
    private static city = joi.string().pattern(AnnouncementRegexpEnum.CITY)
    private static region = joi.number().min(1).integer().external(async (value, helpers) => {
        if(!value){
            return
        }
        const region = await regionRepository.getById(value)
        if(!region){
            return helpers.error("any.existent")
        }
    })
    private static price = joi.number().min(0)
    private static currency = joi.string().valid(...Object.values(CurrencyEnum))
    private static dealershipId = joi.string().custom((value, helpers) => {
        if(!isObjectIdOrHexString(value)){
            return helpers.error("string.objectId")
        }
        return value
    })
    private static approve_attempts = joi.number().min(0)
    private static status = joi.string().valid(...Object.values(AnnouncementStatusEnum)).trim()

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
    }).min(1)

    public static updateAnnouncementByAdmin = joi.object({
        title: this.title,
        description: this.description,
        city: this.city,
        region: this.region,
        price: this.price,
        currency: this.currency,
        approve_attempts: this.approve_attempts,
        status: this.status,
        vehicle: VehicleValidator.updateVehicle,
    }).min(1)
}