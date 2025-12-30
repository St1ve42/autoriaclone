const BASE_MESSAGES = {
    'any.required': 'The field {{#label}} is mandatory',
    'string.empty': 'The field {{#label}} cannot be empty',
    'string.base': '{{#label}} must be a valid text string',
    'number.base': '{{#label}} must be a valid number',
    'number.min': '{{#label}} cannot be less than {{#limit}}',
    'number.max': '{{#label}} cannot be greater than {{#limit}}',
    'string.min': '{{#label}} requires at least {{#limit}} characters',
    'string.max': '{{#label}} exceeds the maximum length of {{#limit}} characters',
    'any.only': 'Invalid value for {{#label}}. Allowed options: {{#valids}}',
    'any.existent': `{{#label}} not found`,
    'string.email': '{{#label}} must be a valid email address',
    'string.unique.taken': '{{#label}} is taken',
    'string.pattern.base': '{{#label}} format is invalid',
};

export const joiOptions = {
    messages: BASE_MESSAGES,
    errors: {
        wrap: {
            label: ''
        }
    }
};