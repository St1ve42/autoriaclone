import {RegexBuilder, RegExpression} from "../../regExp/regExp.ts";

export const VehicleRegexpEnum = {
    BRAND: new RegexBuilder().withLatin().withCyrillic().build(),
    MODEL: new RegexBuilder().withLatin().withCyrillic().withSpace().withNumbers().build(),
    COLOR: new RegexBuilder().withLatin().withCyrillic().build(),
    IMPORTED_FROM: new RegexBuilder(3, 50).withLatin().withCyrillic().withSpace().build()
}

