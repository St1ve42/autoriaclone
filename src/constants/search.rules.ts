import Joi from "joi";

export const userSearchRules = {
    email: Joi.string().email().messages({'string.email': 'Invalid email format'}),
    id: Joi.string().hex().length(24).messages({'string.length': 'ID must be 24 chars'}),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
    name: Joi.string().min(2).max(50),
    sku: Joi.string().alphanum()
};

