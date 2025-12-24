// import {vehicleRepository} from "../repository/vehicle.repository.ts";
// import {announcementRepository} from "../repository/announcement.repository.ts";
// import {AnnouncementType} from "../types/AnnouncementType.ts";
// import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
// import {ExchangeCurrencyType} from "../types/ExchangeCurrencyType.ts";
// import {averagePricesRepository} from "../repository/average.price.repository.ts";
// import {regionRepository} from "../repository/region.repository.ts";
// import {Region} from "../../prisma/src/generated/prisma/client.ts";

import {announcementRepository} from "../repository/announcement.repository.ts";
import { Utils } from "../utils/utils.ts";
import {averagePricesRepository} from "../repository/average.price.repository.ts";
import {regionRepository} from "../repository/region.repository.ts";
import {Region} from "../../prisma/src/generated/prisma/client.ts";

export const CalculateAveragePriceCron = async() => {
    const AnnouncementsJoinOnVehicle = await announcementRepository.joinOnVehicle()
    const analyticsMap = new Map<string, {
        brand: string
        model: string
        region: string
        sumPrice: number
        count: number
    }>()
    for (const announcement of AnnouncementsJoinOnVehicle) {
        let priceUSD = Utils.normalizeToUSD(announcement.price, announcement.currency, announcement.exchange_rate)
        const vehicle = announcement.vehicle[0]
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

    for(const [key, {brand, model, sumPrice, region, count}] of analyticsMap){
        const {id} = await regionRepository.getByName(region + " область") as Region
        await averagePricesRepository.create({brand, model, region: {connect: {id}}, avg_price: Math.trunc(sumPrice / count), cars_count: count})
    }


}
//

    // await Promise.all(vehicles.map(async ({brand, model, _id}) => {
    //     let {price, region, currency, exchange_rate} = await announcementRepository.findByVehicleId(_id) as AnnouncementType
    //     const exchangeRateUSD = exchange_rate.find((rate) => rate.ccy === CurrencyEnum.USD) as ExchangeCurrencyType
    //     if(currency === CurrencyEnum.UAH){
    //         price = price / Number(exchangeRateUSD.sale)
    //     }
    //     else if(currency !== CurrencyEnum.EUR){
    //         const exchangeRateEUR = exchange_rate.find((rate) => rate.ccy === CurrencyEnum.EUR) as ExchangeCurrencyType
    //         price = price * Number(exchangeRateEUR.sale) / Number(exchangeRateUSD.sale)
    //     }
    //     const vehicleAnalyticsIndex = analytics.findIndex((vehicle_analytics) => vehicle_analytics.brand === brand && vehicle_analytics.model === model && vehicle_analytics.region === region)
    //     if(vehicleAnalyticsIndex === -1){
    //         analytics.push({brand, model, region, sumPrice: price, count: 1} as never)
    //     }
    //     else{
    //         const {sumPrice} = analytics[vehicleAnalyticsIndex]
    //         analytics[vehicleAnalyticsIndex].sumPrice = sumPrice + price
    //         analytics[vehicleAnalyticsIndex].count++
    //     }
    // }))
    // await Promise.all(analytics.map(async (analytic) => {
    //     const {id} = await regionRepository.getByName(analytic.region) as Region
    //     await averagePricesRepository.create({})
    // }))
    // brand model   brand model   brand model
    //     [
    //     {
    //         "id": "692da2c9c1145f8899f4c63a",
    //         "brand": "Audi",
    //         "model": "a6",
    //         "year": "2019",
    //         "vehicle_type": "легковий",
    //         "mileage": 18000,
    //         "characteristics": {
    //             "fuel_consumption": {},
    //             "transmission": "ручна",
    //             "fuel_type": "бензин",
    //             "engine_power": 10000
    //         }
    //     },
    //         {
    //             "id": "692da50ac1145f8899f4c63c",
    //             "brand": "Mercedes",
    //             "model": "Vito",
    //             "year": "2021",
    //             "vehicle_type": "легковий",
    //             "mileage": 18000,
    //             "characteristics": {
    //                 "fuel_consumption": {
    //                     "city": 5
    //                 },
    //                 "transmission": "ручна",
    //                 "fuel_type": "бензин",
    //                 "engine_power": 120
    //             }
    //         },
    //         {
    //             "id": "692f5c4d4651ba0dafd17036",
    //             "brand": "Mercedes",
    //             "model": "Vito",
    //             "year": "2021",
    //             "vehicle_type": "легковий",
    //             "mileage": 18000,
    //             "characteristics": {
    //                 "fuel_consumption": {}
    //             }
    //         },
    //         {
    //             "id": "69405362a1f50e5783c62d89",
    //             "brand": "Audi",
    //             "model": "e-tron",
    //             "year": "2021",
    //             "vehicle_type": "легковий",
    //             "mileage": 150000,
    //             "characteristics": {
    //                 "fuel_consumption": {},
    //                 "transmission": "автомат",
    //                 "engine_power": 408,
    //                 "drive_type": "повний",
    //                 "door_number": 5,
    //                 "color": "чорний",
    //                 "metallic": true,
    //                 "seat_number": 5,
    //                 "imported_from": "Poland",
    //                 "paint_condition": "професійно виправлені сліди використання"
    //             }
    //         },
    //         {
    //             "id": "69458f9de7133f4d3aa16665",
    //             "brand": "Audi",
    //             "model": "e-tron",
    //             "year": "2021",
    //             "vehicle_type": "легковий",
    //             "mileage": 150000,
    //             "characteristics": {
    //                 "fuel_consumption": {},
    //                 "transmission": "автомат",
    //                 "engine_power": 408,
    //                 "drive_type": "повний",
    //                 "door_number": 5,
    //                 "color": "чорний",
    //                 "metallic": true,
    //                 "seat_number": 5,
    //                 "imported_from": "Poland",
    //                 "paint_condition": "професійно виправлені сліди використання"
    //             }
    //         }
    //     ]
    // let analytics = [{brand: ,model: , region: , sumPrice: , count: }]
    //
    // brand model -> (price | region & price | null) count
    //
    //
// }