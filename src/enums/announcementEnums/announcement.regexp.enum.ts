import {RegexBuilder} from "../../regExp/regExp.ts";

export const AnnouncementRegexpEnum = {
    TITLE: new RegexBuilder(3, 100).withLatin().withCyrillic().withNumbers().withSpace().build(),
    CITY: new RegexBuilder(3, 50).withLatin().withCyrillic().withSymbols("-").withSpace().build(),
}