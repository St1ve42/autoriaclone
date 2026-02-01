export const BASE_MESSAGES = {
    'any.required': 'Поле {{#label}} є необхідним',
    'any.only': 'Неправильне значення для поля {{#label}}. Дозволені значення: {{#valids}}',
    'any.existent': `{{#label}} не знайдено`,
    'string.empty': 'Поле {{#label}} має бути заповненим',
    'string.base': '{{#label}} повинно бути стрічкою',
    'string.min': '{{#label}} повинно містити принаймні {{#limit}} символів',
    'string.max': '{{#label}} може містити максимально {{#limit}} символів',
    'string.email': 'Невірний формат поштової адреси. Вона повинна мати вигляд \'username@example.com\' і може містити тільки перелічені рівні верхнього домену: com, ua',
    'string.unique.taken': 'Значення {{#label}} має інакший запис',
    "number.empty": "Поле {{#label}} має бути заповненим",
    'number.base': '{{#label}} повинно бути числом',
    'number.integer': '{{#label}} повинно бути цілим числом',
    'number.min': '{{#label}} повинно бути більшим, ніж {{#limit}}',
    'number.max': '{{#label}} повинно бути меншим, ніж {{#limit}}',
    'boolean.base': "Поле {{#label}} має бути типу boolean",
    'array.empty': '{{#label}} повинно бути заповненим',
    'array.base': '{{#label}} повинно бути масивом',
    'array.min': 'Масив {{#label}} повинен містити мінімум {{#limit}} елементів',
    'object.min': '{{#label}} повинен містити принаймні один ключ',
    'object.base': '{{#label}} повинен бути об`єктом',
};

export const joiOptions = {
    messages: BASE_MESSAGES,
    errors: {
        wrap: {
            label: '',
            array: '',
            string: ''
        }
    }
};