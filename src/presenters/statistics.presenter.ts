import {StatisticsType} from "../types/StatisticsType.ts";

class StatisticsPresenter{
    public res(statistics: StatisticsType){
        return {
            total_views: statistics.total_views,
            views: statistics.views,
            average_price: statistics.average_price
        }
    }

}

export const statisticsPresenter = new StatisticsPresenter()