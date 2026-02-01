import joi from "joi"
import {UserRegexpEnum} from "../enums/userEnums/user.regexp.enum.ts";
import {AccountTypeEnum, GenderEnum} from "../../prisma/src/generated/prisma/enums.ts";
import {regionRepository} from "../repository/region.repository.ts";
import {GlobalRoleEnums} from "../enums/globalRoleEnums/globalRoleEnums.ts";
import { Utils } from "../utils/utils.ts";

export class UserValidator{
    private static name = joi.string().regex(UserRegexpEnum.NAME).trim().messages({
        "string.pattern.base": "{{#field}} повинно містити тільки кирилицю і бути довжиною від 3 до 30"
    })
    private static surname = joi.string().regex(UserRegexpEnum.SURNAME).trim().messages({
        "string.pattern.base": "{{#field}} повинно містити тільки кирилицю і бути довжиною від 3 до 30"
    })
    private static age = joi.number().min(1).integer().max(100)
    private static email = joi.string().regex(UserRegexpEnum.EMAIL).email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }})
    private static password = joi.string().regex(UserRegexpEnum.PASSWORD).trim().messages({
        "string.pattern.base": "Пароль повинен містити принаймні 1 цифру (0-9), " +
            "1 букву з верхнім регістром, " +
            "1 букву з нижнім регістром, " +
            "1 не буквенно-цифровий символ" +
            "та бути довжиною у 8-16 символів без пробілу"
    })
    private static gender = joi.string().valid(...Object.values(GenderEnum)).trim()
    private static phone = joi.string().regex(UserRegexpEnum.PHONE).trim().messages({
        "string.pattern.base": "Телефон повинен бути вигляду '+38 (000) 000 00 00'"
    })
    private static city = joi.string().regex(UserRegexpEnum.CITY).trim().messages({
        "string.pattern.base": "{{#field}} повинно містити тільки кирилицю і бути довжиною від 3 до 30"
    })
    private static region_id = joi.number().min(1).integer().messages({
        "string.pattern.base": "{{#field}} повинно містити тільки кирилицю і бути довжиною від 3 до 30"
    }).external(async (value, helpers) => {
        if(!value){
            return
        }
        const region = await regionRepository.getById(value)
        if(!region){
            return helpers.error("any.existent")
        }
    })
    private static role_id = joi.string().valid(...Object.values(GlobalRoleEnums)).trim()
    private static account_type = joi.string().valid(...Object.values(AccountTypeEnum)).trim()
    private static boolean_field = joi.boolean()

    private static addBaseMessages = Utils.addBaseMessages;

    private static userSearchRules = {
        name: this.addBaseMessages(this.name),
        surname: this.addBaseMessages(this.surname),
        email: this.addBaseMessages(this.email),
        phone: this.addBaseMessages(this.phone),
        age: this.addBaseMessages(this.age),
        city: this.addBaseMessages(this.city),
        region_id: this.addBaseMessages(this.region_id),
        role_id: this.addBaseMessages(this.role_id),
        account_type: this.addBaseMessages(this.account_type),
        is_active: this.addBaseMessages(this.boolean_field),
        is_verified: this.addBaseMessages(this.boolean_field),
        is_banned: this.addBaseMessages(this.boolean_field),
        is_deleted: this.addBaseMessages(this.boolean_field),
    };

    public static userSearchCases = Object.entries(this.userSearchRules).map(([key, schema]) => ({
        is: key,
        then: schema
    }));

    public static createUser = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
        city: this.city.required(),
        region_id: this.region_id.required(),
        gender: this.gender,
        phone: this.phone
    })

    public static updateUser = joi.object({
        name: this.name,
        surname: this.surname,
        age: this.age,
        city: this.city,
        region_id: this.region_id,
        gender: this.gender,
        phone: this.phone,
    }).min(1)

    public static signIn = joi.object({
        email: this.email.required(),
        password: this.password.required()
    })

    public static recoveryRequest = joi.object({
        email: this.email.required()
    })

    public static recovery = joi.object({
        password: this.password.required()
    })

    public static change = joi.object({
        oldPassword: this.password.required(),
        password: this.password.required()
    })

}

