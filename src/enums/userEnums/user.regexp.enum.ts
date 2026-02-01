import {RegexBuilder} from "../../regExp/regExp.ts";

export const UserRegexpEnum = {
    NAME: new RegexBuilder().withLatin().withCyrillic().withSymbols("-").build(),
    SURNAME: new RegexBuilder(3, 50).withLatin().withCyrillic().withSymbols("-").build(),
    CITY: new RegexBuilder(3, 50).withLatin().withCyrillic().withSymbols("-").withSpace().build(),
    PHONE: /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
    EMAIL: /^[^-_]+$/,
    PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/
}
