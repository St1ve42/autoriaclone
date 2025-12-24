import {configs} from "../configs/configs.ts";
import {ExchangeCurrencyMap, ExchangeCurrencyType} from "../types/ExchangeCurrencyType.ts";

export class PrivatBank{
    public static async getExchangeRate(): Promise<ExchangeCurrencyMap>{
        const exchangeRates = await fetch(`${configs.PRIVATBANK_API}?exchange&coursid=5`).then(res => res.json()) as ExchangeCurrencyType[]
        return exchangeRates.reduce<ExchangeCurrencyMap>((accum, rate) => {
            accum[rate.ccy] = {
                buy: Number(rate.buy),
                sale: Number(rate.sale),
            }

            return accum
        }, {})
    }

}