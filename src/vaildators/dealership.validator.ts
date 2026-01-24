import joi from "joi";
import {DealershipRegexpEnum} from "../enums/dealershipEnums/dealership.regexp.enum.ts";
import {dealerShipService} from "../services/dealership.service.ts";

export class DealershipValidator{
    private static name = joi.string().trim().pattern(DealershipRegexpEnum.NAME)
    private static description = joi.string().trim().min(50).max(5000)
    private static address = joi.string().trim().pattern(DealershipRegexpEnum.ADDRESS).external(async (value, helpers) => {
        const dealership = await dealerShipService.findOneByParams({address: value})
        if(dealership){
            helpers.error("string.unique.taken")
        }
    })
    private static phone = joi.string().trim().pattern(DealershipRegexpEnum.PHONE).external(async (value, helpers) => {
        const dealership = await dealerShipService.findOneByParams({phone: value})
        if(dealership){
            return helpers.error("string.unique.taken")
        }
    })
    private static email = joi.string().pattern(DealershipRegexpEnum.EMAIL).email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).external(async (value, helpers) => {
        const dealership = await dealerShipService.findOneByParams({email: value})
        if(dealership){
            return helpers.error("string.unique.taken")
        }
    })
    private static website = joi.string().trim().pattern(DealershipRegexpEnum.WEBSITE)

    public static createValidator = joi.object({
        name: this.name.required(),
        description: this.description.required(),
        address: this.address.required(),
        phone: this.phone.required(),
        email: this.email.required(),
        website: this.website
    })

    public static updateValidator = joi.object({
        name: this.name,
        description: this.description,
        address: this.address,
        phone: this.phone,
        email: this.email,
        website: this.website
    })


}