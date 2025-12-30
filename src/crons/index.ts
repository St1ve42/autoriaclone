import {calculateAveragePriceCron} from "./average.price.cron.ts";
import {removeOldTokensCron} from "./old.tokens.cron.ts";

export const cronRunner = () => {
    console.log("cronRunner started!")
    calculateAveragePriceCron.start()
    removeOldTokensCron.start()
}