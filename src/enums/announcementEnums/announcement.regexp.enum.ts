import {RegExpression} from "../../regExp/regExp.ts";

export const AnnouncementRegexpEnum = {
    TITLE: RegExpression.alphaNumericPattern(true, 3, 100),
    CITY: RegExpression.alphabetPattern()
}