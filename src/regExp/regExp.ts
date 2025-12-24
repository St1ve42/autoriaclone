export class RegExpression{
    private static basePattern = 'а-яА-яёЁіІїЇєЄҐґ\\-'

    public static makeRegExpAlphabetStringPattern (isSpace: boolean = false, min: number = 3, max: number = 30): RegExp {
        return new RegExp(`^[${this.basePattern + 'a-zA-z' + (isSpace ? '\\s' : '')}]{${min},${max}}$`)
    }

    public static makeRegExpAlphaNumericStringPattern (isSpace: boolean = false, min: number = 3, max: number = 30): RegExp {
        return new RegExp(`^[${this.basePattern + 'a-zA-z\\d' + (isSpace ? '\\s' : '')}]{${min},${max}}$`)
    }

    public static obsceneLanguagePattern(): RegExp {
        return /(?:[а-яіїєґ']*(?:ху[йїя]|п[іие]зд|[єеї]б[ауе]|йоб|бля[дт]|муд[ак]|залуп)[а-яіїєґ']*)|(?:(?:срак|гівн|курв|падл[юу]к|вилуп|дідьк|дурбецал|трясц|грець|стерв|гепард)[а-яіїєґ']*)/iu;
    }
}

