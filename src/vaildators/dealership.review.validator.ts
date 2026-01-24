import joi from "joi";

export class DealershipReviewValidator{
    private static rating = joi.number().integer().min(0).max(10)
    private static text = joi.string().min(50).max(500)

    public static createValidator = joi.object({
        rating: this.rating.required(),
        text: this.text.required()
    })

    public static updateValidator = joi.object({
        rating: this.rating,
        text: this.text
    })

}