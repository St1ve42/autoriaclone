import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import joi from "joi"
import {AnnouncementRegexpEnum} from "../enums/announcementEnums/announcement.regexp.enum.ts";
import {VehicleValidator} from "./vehicle.validator.ts";
import {regionRepository} from "../repository/region.repository.ts";

export class AnnouncementValidator {
    private static title = joi.string().pattern(AnnouncementRegexpEnum.TITLE).messages({
        "string.pattern.base": "{{#field}} повинно містити тільки кирилицю та числа і бути довжиною від 3 до 100"
    })
    private static description = joi.string().min(30).max(2000)
    private static city = joi.string().pattern(AnnouncementRegexpEnum.CITY).messages({
        "string.pattern.base": "{{#field}} повинно містити тільки кирилицю і бути довжиною від 3 до 30"
    })
    private static region_id = joi.number().min(1).integer().external(async (value, helpers) => {
        if(!value){
            return
        }
        const region = await regionRepository.getById(value)
        if(!region){
            return helpers.message("Регіон не знайдено")
        }
    })
    private static price = joi.number().min(0)
    private static currency = joi.string().valid(...Object.values(CurrencyEnum))

    public static createAnnouncement = joi.object({
        title: this.title.required(),
        description: this.description.required(),
        city: this.city.required(),
        region_id: this.region_id.required(),
        price: this.price.required(),
        currency: this.currency.required(),
        vehicle: VehicleValidator.createVehicle.required(),
    })

    public static updateAnnouncement = joi.object({
        title: this.title,
        description: this.description,
        city: this.city,
        region_id: this.region_id,
        price: this.price,
        currency: this.currency,
        vehicle: VehicleValidator.updateVehicle
    }).min(1)
}