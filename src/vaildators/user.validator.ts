import joi from "joi"
import {RegexpEnum} from "../enums/regexp.enum.ts";
import {GenderEnum} from "../../prisma/src/generated/prisma/enums.ts";
export class UserValidator{
    private static name = joi.string().regex(RegexpEnum.NAME).trim().messages({
        "any.required": "name is required",
        "string.empty": "name must not be empty",
        "string.base": "name must be string type",
        "string.pattern.base": "name must contain only alphabet symbols and be 3-10 characters long"
    })
    private static surname = joi.string().regex(RegexpEnum.SURNAME).trim().messages({
        "any.required": "surname is required",
        "string.empty": "surname must not be empty",
        "string.base": "surname must be string type",
        "string.pattern.base": "surname must contain only alphabet symbols and be 3-10 characters long"
    })
    private static age = joi.number().min(1).max(100).messages({
        "any.required": "age is required",
        "number.empty": "age must not be empty",
        "number.base": "age must be number type",
        "number.min": "age must be more than or equal to 1",
        "number.max": "age must be less than or equal to 100"
    })
    private static email = joi.string().regex(RegexpEnum.EMAIL).email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).messages({
        "any.required": "email is required",
        "string.empty": "email must not be empty",
        "string.base": "email must be string",
        "string.email": "Invalid email address. The email must look like 'username@example.com'. Only top-level domains .com and .net are allowed",
        "string.pattern.base": "email must contain only alpha-numeric characters and dot",
    })
    private static password = joi.string().regex(RegexpEnum.PASSWORD).messages({
        "any.required": "password is required",
        "string.empty": "password must not be empty",
        "string.base": "password must be string",
        "string.pattern.base": "password must contain at least 1 number (0-9), " +
            "1 uppercase letter, " +
            "1 lowercase letter, " +
            "1 non-alpha numeric number " +
            "and be 8-16 characters long with no space"
    })
    private static gender = joi.string().valid(...Object.values(GenderEnum)).trim().messages({
        "string.empty": "gender must not be empty",
        "string.base": "gender must be string type",
        "any.only": "gender must be either male or female"
    })
    private static phone = joi.string().regex(RegexpEnum.PHONE).trim().messages({
        "string.empty": "phone must not be empty",
        "string.base": "phone must be string type",
        "string.pattern.base": "phone must look like '+38 (000) 000 00 00'"
    })
    private static city = joi.string().regex(RegexpEnum.CITY).trim().messages({
        "any.required": "city is required",
        "string.empty": "city must not be empty",
        "string.base": "city must be string type",
        "string.pattern.base": "city must contain only cyrillic characters and be 3-30 characters long"
    })
    private static region = joi.string().regex(RegexpEnum.REGION).trim().messages({
        "any.required": "region is required",
        "string.empty": "region must not be empty",
        "string.base": "region must be string type",
        "string.pattern.base": "region must contain only cyrillic characters and be 3-30 characters long"
    })

    public static createUser = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
        city: this.city.required(),
        region: this.region.required(),
        gender: this.gender,
        phone: this.phone
    })

    public static updateUser = joi.object({
        name: this.name,
        surname: this.surname,
        age: this.age,
        city: this.city,
        region: this.region,
        gender: this.gender,
        phone: this.phone
    })

}

//TODO Fix message where is not allowed field