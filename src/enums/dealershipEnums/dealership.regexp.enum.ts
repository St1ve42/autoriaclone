import {RegexBuilder} from "../../regExp/regExp.ts";

export const DealershipRegexpEnum = {
    NAME: new RegexBuilder().withCyrillic().withLatin().withSymbols(`'"`).withSpace().build(),
    ADDRESS: new RegexBuilder(3, 50).withCyrillic().withLatin().withSymbols(',.').withSpace().withNumbers().build(),
    PHONE: /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
    EMAIL: /^[^-_]+$/,
    WEBSITE: /^https?:\/\/([\w-]+\.)+[\w-]{2,}$/,
}

