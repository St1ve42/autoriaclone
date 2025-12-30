import {announcementRepository} from "../repository/announcement.repository.ts";
import { Utils } from "../utils/utils.ts";
import {averagePricesRepository} from "../repository/average.price.repository.ts";
import {regionRepository} from "../repository/region.repository.ts";
import {Region} from "../../prisma/src/generated/prisma/client.ts";
import {CronJob} from "cron";

const calculateAveragePriceHandler = async() => {
    try{
        const announcements = await announcementRepository.getAll()
        const analyticsMap = new Map<string, {
            brand: string
            model: string
            region: string
            sumPrice: number
            count: number
        }>()
        for (const announcement of announcements) {
            let priceUSD = Utils.normalizeToUSD(announcement.price, announcement.currency, announcement.exchange_rate)
            const vehicle = announcement.vehicle
            const key = `${vehicle.brand}|${vehicle.model}|${announcement.region}`

            if (!analyticsMap.has(key)) {
                analyticsMap.set(key, {
                    brand: vehicle.brand,
                    model: vehicle.model,
                    region: announcement.region,
                    sumPrice: priceUSD,
                    count: 1
                })
            } else {
                const item = analyticsMap.get(key)!
                item.sumPrice += priceUSD
                item.count++
            }
        }

        for(const [_key, {brand, model, sumPrice, region, count}] of analyticsMap){
            const {id} = await regionRepository.getByName(region) as Region
            await averagePricesRepository.create({brand, model, region: {connect: {id}}, avg_price: Math.trunc(sumPrice / count), cars_count: count})
        }
    }
    catch (e){
        console.error(e)
    }

}

export const calculateAveragePriceCron = new CronJob("* * 1 * *", calculateAveragePriceHandler)
