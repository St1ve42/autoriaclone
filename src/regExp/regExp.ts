export class RegExpression{
    private static basePattern = 'а-яА-яёЁіІїЇєЄҐґ'

    public static alphabetPattern (isSpace: boolean = false, min: number = 3, max: number = 50): RegExp {
        return new RegExp(`^[${this.basePattern + 'a-zA-z' + (isSpace ? '\\s' : '')}]{${min},${max}}$`)
    }

    public static alphaNumericPattern (isSpace: boolean = false, min: number = 3, max: number = 30): RegExp {
        return new RegExp(`^[${this.basePattern + '\\w' + (isSpace ? '\\s' : '')}]{${min},${max}}$`)
    }

    public static obsceneLanguagePattern(): RegExp {
        return /((п[іi1!|иuеe3]+[зz3]+[дd]+)|(х[уy]+[йiіjяyaеeюyuлl]+)|(б[лl]+[яya@]+[дdтt]*)|([мm][уy]+[дd]+([аa@]+[кk]+|и+|і+))|([еєe3][бb6]([аa@]+[лl]|н|у|і|о|и))|(г[оo0аa@]+н?д[оo0]+н)|([сs$c][уu]+[кk][аa@]+)|(ж[оo0]+п[аa@]+)|(ср[аa@]+к)|(х[еe3]+р)|(к[уu]+рв)|(ст[еe3]рв)|(м[аa@]+нд[аa@]+)|(з[аa@]+л[уu]+п)|(п[іi1!|еe3]+д[аa@o0]+р))/iu;
    }
}

