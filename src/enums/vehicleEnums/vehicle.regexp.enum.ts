import {RegExpression} from "../../regExp/regExp.ts";

export const VehicleRegexpEnum = {
    BRAND: RegExpression.alphabetPattern(),
    MODEL: RegExpression.alphaNumericPattern(true),
    COLOR: RegExpression.alphabetPattern(),
    IMPORTED_FROM: RegExpression.alphabetPattern(true, 3, 50)
}

