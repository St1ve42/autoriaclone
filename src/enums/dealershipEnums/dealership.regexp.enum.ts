import {RegExpression} from "../../regExp/regExp.ts";

export const DealershipRegexpEnum = {
    NAME: RegExpression.alphabetPattern(true),
    ADDRESS: RegExpression.alphaNumericPattern(true), //?
    PHONE: /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
    EMAIL: /^[^-_]+$/,
    WEBSITE: /^http(s|):\/\/www\.\w+\.[a-zA-z]{2,3}$/,
}

