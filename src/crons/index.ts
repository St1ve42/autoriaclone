import {calculateAveragePriceCron} from "./average.price.cron.ts";
import {removeOldTokensCron} from "./old.tokens.cron.ts";
import {averageRatingCron} from "./dealership.rating.cron.ts";

export const cronRunner = () => {
    console.log("cronRunner started!")
    calculateAveragePriceCron.start()
    removeOldTokensCron.start()
    averageRatingCron.start()
}