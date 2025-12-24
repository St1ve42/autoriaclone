import {StatisticsType} from "../types/StatisticsType.ts";

class StatisticsPresenter{
    public list(
        statistics: StatisticsType[],
    ) {
        return statistics.map(vehicle => this.res(vehicle))
    }

    public res(statistics: StatisticsType){
        return {
            total_views: statistics.total_views,
            views: statistics.views,
            average_price: statistics.average_price,
            currency: statistics.currency,
        }
    }

}

export const statisticsPresenter = new StatisticsPresenter()