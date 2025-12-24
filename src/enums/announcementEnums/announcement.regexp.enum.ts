import {RegExpression} from "../../regExp/regExp.ts";

export const AnnouncementRegexpEnum = {
    TITLE: RegExpression.makeRegExpAlphaNumericStringPattern(true, 3, 100),
    CITY: RegExpression.makeRegExpAlphabetStringPattern(),
    REGION: RegExpression.makeRegExpAlphabetStringPattern()
}