import {RegExpression} from "../../regExp/regExp.ts";

export const UserRegexpEnum = {
    NAME: RegExpression.alphabetPattern(),
    SURNAME: RegExpression.alphabetPattern(),
    CITY: RegExpression.alphabetPattern(),
    REGION: RegExpression.alphabetPattern(true, 3, 50),
    PHONE: /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
    EMAIL: /^[^-_]+$/,
    PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/
}
