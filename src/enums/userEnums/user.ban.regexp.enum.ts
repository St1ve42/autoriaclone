import {RegExpression} from "../../regExp/regExp.ts";

export const BanRegexpEnum = {
    TIME: /^[0-9]+[ywdhms]$/,
    REASON: RegExpression.alphaNumericPattern(true, 3, 100)
}