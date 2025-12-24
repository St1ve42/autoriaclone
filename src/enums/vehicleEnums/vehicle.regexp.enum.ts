import {RegExpression} from "../../regExp/regExp.ts";

export const VehicleRegexpEnum = {
    BRAND: RegExpression.makeRegExpAlphabetStringPattern(),
    MODEL: RegExpression.makeRegExpAlphaNumericStringPattern(true),
    COLOR: RegExpression.makeRegExpAlphabetStringPattern(),
    IMPORTED_FROM: RegExpression.makeRegExpAlphabetStringPattern()
}

