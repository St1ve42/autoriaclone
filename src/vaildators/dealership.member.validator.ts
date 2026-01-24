import joi from "joi";
import {UserRegexpEnum} from "../enums/userEnums/user.regexp.enum.ts";
import {DealershipRoleEnum} from "../enums/vehicleEnums/dealership.enum.ts";
import {userService} from "../services/user.service.ts";

export class DealershipMemberValidator{
    private static email = joi.string().regex(UserRegexpEnum.EMAIL).email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).trim().external(async (value, helper) => {
        const user = await userService.getByEmail(value)
        if(!user){
            return helper.error("string.unique.taken")
        }
    })
    private static role = joi.string().valid(...Object.values(DealershipRoleEnum).filter(value => value !== DealershipRoleEnum.OWNER)).trim()

    public static create = joi.object({
        email: this.email.required(),
        role: this.role.required()
    })

    public static update = joi.object({
        role: this.role
    }).min(1)

}