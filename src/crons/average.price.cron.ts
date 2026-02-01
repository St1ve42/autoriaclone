import {announcementRepository} from "../repository/announcement.repository.ts";
import {Utils} from "../utils/utils.ts";
import {averagePricesRepository} from "../repository/average.price.repository.ts";
import {CronJob} from "cron";
import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import Decimal from "decimal.js";
import {ExchangeRateResultType} from "../types/ExchangeRateResultType.ts";

const calculateAveragePriceHandler = async() => {
    try{
        const announcements = await announcementRepository.getAll()
        const analyticsMap = new Map<string, {
            brand: string
            model: string
            region_id: number
            sumPrice: number
            count: number
        }>()
        for (const announcement of announcements) {
            let {value: priceUSD} = await Utils.normalizeToCurrency(new Decimal(announcement.price), announcement.currency, CurrencyEnum.USD, Object.fromEntries(announcement.exchange_rate) as ExchangeRateResultType)
            const vehicle = announcement.vehicle
            const key = `${vehicle.brand}|${vehicle.model}|${announcement.region_id}`

            if (!analyticsMap.has(key)) {
                analyticsMap.set(key, {
                    brand: vehicle.brand,
                    model: vehicle.model,
                    region_id: announcement.region_id,
                    sumPrice: priceUSD,
                    count: 1
                })
            } else {
                const item = analyticsMap.get(key)!
                item.sumPrice += priceUSD
                item.count++
            }
        }

        for(const [_key, {brand, model, sumPrice, region_id, count}] of analyticsMap){
            await averagePricesRepository.create({brand, model, Region: {connect: {id: region_id}}, avg_price: Math.trunc(sumPrice / count), cars_count: count})
        }
    }
    catch (e){
        console.error(e)
    }

}

export const calculateAveragePriceCron = new CronJob("0 0 4 * * *", calculateAveragePriceHandler)
