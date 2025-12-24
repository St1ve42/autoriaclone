import {announcementStatisticsRepository} from "../repository/announcement.statistics.repository.ts";
import {AnnouncementStatistics, Region} from "../../prisma/src/generated/prisma/client.ts";
import {announcementViewsDayRepository} from "../repository/announcement.views.day.repository.ts";
import {StatisticsType} from "../types/StatisticsType.ts";
import {announcementService} from "./announcement.service.ts";
import {vehicleService} from "./vehicle.service.ts";
import {averagePricesRepository} from "../repository/average.price.repository.ts";
import {regionRepository} from "../repository/region.repository.ts";

class AnnouncementStatisticsService {
    public async getAnnouncementStatistics(announcementId: string): Promise<StatisticsType> {
        const {total_views} = await announcementStatisticsRepository.getByAnnouncementId(announcementId) as AnnouncementStatistics
        const {views} = await this.getViewStatistics(announcementId)
        const {vehicle_id, region} = await announcementService.get(announcementId)
        const {brand, model} = await vehicleService.get(vehicle_id)
        const {id} = await regionRepository.getByName(region + " область") as Region
        const averagePriceInRegion = await averagePricesRepository.getInRegion({brand, model, region_id: id})
        const averagePriceInCountry = (await averagePricesRepository.getInCountry({brand, model}))[0]
        return {total_views, views, average_price: {region: averagePriceInRegion ? Math.trunc(Number(averagePriceInRegion.avg_price)) : 0, country: averagePriceInCountry ? Math.trunc(Number(averagePriceInCountry.avg_country_price)) : 0}, currency: "USD"}
    }

    public async increaseViewCount(announcementId: string): Promise<StatisticsType> {
        await announcementStatisticsRepository.increaseViewCount(announcementId)
        await announcementViewsDayRepository.increaseViewCount(announcementId)
        return await this.getAnnouncementStatistics(announcementId)
    }

    public async getViewStatistics(announcementId: string): Promise<Pick<StatisticsType, "views">>{
        let announcementViewDay = await announcementViewsDayRepository.getById(announcementId)
        if(!announcementViewDay){
            announcementViewDay = await announcementViewsDayRepository.create(announcementId)
        }
        const views_per_week = (await announcementViewsDayRepository.sumViewsByWeek(announcementId))._sum.views
        const views_per_month = (await announcementViewsDayRepository.sumViewsByMonth(announcementId))._sum.views
        return {views: {day: announcementViewDay.views, week: views_per_week ?? 0, month: views_per_month ?? 0}}
    }
}

export const announcementStatisticsService = new AnnouncementStatisticsService()