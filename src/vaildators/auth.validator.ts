import joi from "joi";

export class AuthValidator{
    private static refresh = joi.string().trim().messages({
        "any.required": "refresh is required",
        "string.empty": "refresh must not be empty",
        "string.base": "refresh must be string"
    })

    public static refreshToken = joi.object({
        refreshToken: this.refresh.required()
    })
}
