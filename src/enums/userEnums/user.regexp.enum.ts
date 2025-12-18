import {RegExpression} from "../../regExp/regExp.ts";

export const UserRegexpEnum = {
    NAME: RegExpression.makeRegExpAlphabetStringPattern(),
    SURNAME: RegExpression.makeRegExpAlphabetStringPattern(),
    CITY: RegExpression.makeRegExpAlphabetStringPattern(),
    REGION: RegExpression.makeRegExpAlphabetStringPattern(),
    PHONE: /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
    EMAIL: /^[^-_]+$/,
    PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/
}
