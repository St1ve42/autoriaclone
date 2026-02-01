import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";

export type ExchangeRateResultType = Record<CurrencyEnum, { buy: number, sale: number }>