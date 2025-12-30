import joi from "joi";

export class ImageValidator{
    public static validator = joi.object({
        images: joi.array().items(joi.string().strict()).required().min(1)
    })
}