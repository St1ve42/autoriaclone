import type {Request} from "express"
import {RegExpression} from "../regExp/regExp.ts";
import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import {whitelist} from "../constants/general.constants.ts";
import {PrivatBank} from "../publicAPI/PrivatBank.ts";
import { Decimal } from "@prisma/client/runtime/library";
import {AlternativesSchema, BooleanSchema, NumberSchema, StringSchema} from "joi";
import {BASE_MESSAGES} from "../constants/joi.constants.ts";
import {ExchangeRateResultType} from "../types/ExchangeRateResultType.ts";


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

    public static async normalizeToCurrency(value: Decimal, inputCurrency: CurrencyEnum, outputCurrency: CurrencyEnum, input_exchange_rate?: ExchangeRateResultType): Promise<{value: number, currency: CurrencyEnum | null}>{
        const normalizedCurrency: {value: number, currency: CurrencyEnum | null} = {value: value.toNumber(), currency: outputCurrency}
        if(inputCurrency !== outputCurrency){
            const exchange_rate = input_exchange_rate || await PrivatBank.getExchangeRate()
            if(inputCurrency === CurrencyEnum.UAH){
                const outputCurrencyExchangeRate = exchange_rate[outputCurrency]
                const {sale} = outputCurrencyExchangeRate
                normalizedCurrency["value"] = value.div(sale).toNumber()
            }
            else if(outputCurrency === CurrencyEnum.UAH){
                const inputCurrencyExchangeRate = exchange_rate[inputCurrency]
                const {buy} = inputCurrencyExchangeRate
                normalizedCurrency["value"] = value.times(buy).toNumber()
            }
            else{
                const inputCurrencyExchangeRate = exchange_rate[inputCurrency]
                const outputCurrencyExchangeRate = exchange_rate[outputCurrency]
                const {buy} = inputCurrencyExchangeRate
                const {sale} = outputCurrencyExchangeRate
                normalizedCurrency["value"] = value.times(buy).div(sale).toNumber()
            }
        }
        return normalizedCurrency

    }

    public static addBaseMessages (schema: StringSchema | NumberSchema | BooleanSchema | AlternativesSchema) {
        return schema.messages(BASE_MESSAGES).options({
            errors: {
                wrap: {
                    label: false,
                    array: false,
                    string: false
                }
            }
        })
    }



}

