import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";

type ExchangeCurrencyType = {
  ccy: Exclude<CurrencyEnum, 'UAH'>;
  base_ccy: "UAH";
  buy: string;
  sale: string;
}

type ExchangeCurrencyMap = Map<CurrencyEnum, {buy: number, sale: number}> //fix

export type {ExchangeCurrencyType, ExchangeCurrencyMap}