import {announcementStatisticsRepository} from "../repository/announcement.statistics.repository.ts";
import {AnnouncementStatistics} from "../../prisma/src/generated/prisma/client.ts";
import {announcementViewsDayRepository} from "../repository/announcement.views.day.repository.ts";
import {StatisticsType} from "../types/StatisticsType.ts";
import {announcementService} from "./announcement.service.ts";
import {averagePricesRepository} from "../repository/average.price.repository.ts";

class AnnouncementStatisticsService {
    private async getViewStatistics(announcementId: string): Promise<Pick<StatisticsType, "views">>{
        let announcementViewDay = await announcementViewsDayRepository.getById(announcementId)
        if(!announcementViewDay){
            announcementViewDay = await announcementViewsDayRepository.create(announcementId)
        }
        const views_per_week = (await announcementViewsDayRepository.sumViewsByWeek(announcementId))._sum.views
        const views_per_month = (await announcementViewsDayRepository.sumViewsByMonth(announcementId))._sum.views
        return {views: {day: announcementViewDay.views, week: views_per_week ?? 0, month: views_per_month ?? 0}}
    }

    public async get(announcementId: string): Promise<StatisticsType> {
        const announcementStatistic = await announcementStatisticsRepository.getByAnnouncementId(announcementId) as AnnouncementStatistics
        const {total_views} = announcementStatistic ? announcementStatistic : await announcementStatisticsRepository.create(announcementId)
        const {views} = await this.getViewStatistics(announcementId)
        const {region_id: region_id, vehicle: {brand, model}} = await announcementService.get(announcementId)
        const carsCountInCountry = await averagePricesRepository.getCarCount({brand, model})
        const carsCountInRegion = await averagePricesRepository.getCarCount({brand, model, region_id})
        const averagePriceInRegion = await averagePricesRepository.getInRegion({brand, model, region_id})
        const averagePriceInCountry = await averagePricesRepository.getInCountry({brand, model})
        return {
            total_views,
            views,
            average_price: {
                region: {
                    value: averagePriceInRegion && carsCountInRegion && carsCountInRegion >= 10 ? Math.trunc(Number(averagePriceInRegion)) : null,
                    vehicles_count: carsCountInRegion as number
                },
                country: {
                    value: averagePriceInCountry && carsCountInCountry && carsCountInCountry >= 10 ? Math.trunc(Number(averagePriceInCountry)) : null,
                    vehicles_count: carsCountInCountry as number
                },
                currency: "USD"
            }
        }
    }

    public async create(announcementId: string): Promise<void>{
        await announcementStatisticsRepository.create(announcementId)
        await announcementViewsDayRepository.create(announcementId)
    }

    public async increaseViewCount(announcementId: string): Promise<StatisticsType> {
        await announcementStatisticsRepository.increaseViewCount(announcementId)
        await announcementViewsDayRepository.increaseViewCount(announcementId)
        return await this.get(announcementId)
    }


}

export const announcementStatisticsService = new AnnouncementStatisticsService()

