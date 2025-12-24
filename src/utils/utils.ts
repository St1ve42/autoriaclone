import type {Request} from "express"
import {RegExpression} from "../regExp/regExp.ts";
import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import {ExchangeCurrencyMap} from "../types/ExchangeCurrencyType.ts";


export class Utils{
    public static makeQueryWritable (req: Request): void {
        Object.defineProperty(req, "query", {
            ...Object.getOwnPropertyDescriptor(req, "query"),
            value: req.query,
            writable: true,
        });
    }

    public static getStringOfArrayElements (array: string[]) {
        return array.reduce((accum, value, index, array) => {
            accum += value  + (index !== array.length - 1 ? ', ' : '')
            return accum
        }, '')
    }

    public static isObsceneLanguage(text: string){
        return !!text.split(' ').find(word => RegExpression.obsceneLanguagePattern().test(word))
    }

    public static normalizeToUSD(value: number, currency: CurrencyEnum, exchange_rate: ExchangeCurrencyMap){
        const USDSale = exchange_rate["USD"].sale
        if(currency === CurrencyEnum.UAH){
            return value / USDSale
        }
        else if(currency === CurrencyEnum.EUR){
            return value * exchange_rate["EUR"].buy / USDSale
        }
        return value
    }

}

//TODO give seller when user is activated or come up with how to do that
//TODO forbid banned user to do some actions
//TODO Before logging user must log out
//TODO route that allows to buy premium account
//TODO verifying announcement
//TODO Include role and region in user output
