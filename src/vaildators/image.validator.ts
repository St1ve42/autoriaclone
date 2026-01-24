import joi from "joi";

export class ImageValidator{
    public static validator = joi.object({
        images: joi.array().items(joi.string().strict()).required().min(1).messages({
            "string.base": "Елемент під номером {{#key}} масиву поля image має бути стрічкою"
        })
    })
}