export class RegExpression{
    public static obsceneLanguagePattern(): RegExp {
        return /((п[іi1!|иuеe3]+[зz3]+[дd]+)|(х[уy]+[йiіjяyaеeюуuлl]+)|(б[лl]+[яya@]+[дdтt]*)|([мm][уy]+[дd]+([аa@]+[кk]+|и+|і+))|([еєe3][бb6]([аa@]+[лl]|н|у|і|о|и))|(г[оo0аa@]+н?д[оo0]+н)|([сs$c][уu]+[кk][аa@]+)|(ж[оo0]+п[аa@]+)|(ср[аa@]+к)|(х[еe3]+р)|(к[уu]+рв)|(ст[еe3]рв)|(м[аa@]+нд[аa@]+)|(з[аa@]+л[уu]+п)|(п[іi1!|еe3]+д[аa@o0]+р))/iu;
    }
}

export class RegexBuilder {
    private parts: string[] = [];
    private minLength: number = 3;
    private maxLength: number = 30;

    private static readonly CYRILLIC = 'а-яА-яёЁіІїЇєЄҐґ';
    private static readonly LATIN = 'a-zA-Z';
    private static readonly NUMBERS = '0-9';

    constructor(min: number = 3, max: number = 30) {
        this.minLength = min;
        this.maxLength = max;
    }

    public withCyrillic(): this {
        this.parts.push(RegexBuilder.CYRILLIC);
        return this;
    }

    public withLatin(): this {
        this.parts.push(RegexBuilder.LATIN);
        return this;
    }

    public withNumbers(): this {
        this.parts.push(RegexBuilder.NUMBERS);
        return this;
    }

    public withSpace(): this {
        this.parts.push('\\s');
        return this;
    }

    public withSymbols(chars: string): this {
        const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        this.parts.push(escaped);
        return this;
    }

    public setLength(min: number, max: number): this {
        this.minLength = min;
        this.maxLength = max;
        return this;
    }

    public build(): RegExp {
        const patternStr = this.parts.join('');
        return new RegExp(`^[${patternStr}]{${this.minLength},${this.maxLength}}$`);
    }
}