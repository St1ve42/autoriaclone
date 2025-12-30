import type {Request} from "express"
import {RegExpression} from "../regExp/regExp.ts";
import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import {ExchangeCurrencyMap} from "../types/ExchangeCurrencyType.ts";
import {whitelist} from "../constants/general.constants.ts";


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
        return !!text.toLowerCase().split(' ').find(word => RegExpression.obsceneLanguagePattern().test(word) && !whitelist.includes(word))
    }

    public static normalizeToUSD(value: number, currency: CurrencyEnum, exchange_rate: ExchangeCurrencyMap){
        const USDSale = exchange_rate.get(CurrencyEnum.USD)?.sale as number
        if(currency === CurrencyEnum.UAH){
            return value / USDSale
        }
        else if(currency === CurrencyEnum.EUR){
            return value * exchange_rate.get(CurrencyEnum.EUR)?.buy as number / USDSale
        }
        return value
    }

}

