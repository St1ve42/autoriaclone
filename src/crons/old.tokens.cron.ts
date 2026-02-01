import {TimeHelper} from "../timeHelper/time.helper.ts";
import {configs} from "../configs/configs.ts";
import {tokenRepository} from "../repository/token.repository.ts";
import {CronJob} from "cron";

const removeOldTokensHandler = async() => {
    const {value, unit} = TimeHelper.parseTime(configs.JWT_REFRESH_LIFETIME)
    const date = TimeHelper.subTime(value, unit)
    const {count} = await tokenRepository.deleteBeforeDate(date)
    console.log(`Deleted ${count} tokens`)
}

export const removeOldTokensCron = new CronJob("0 0 4 * * * ", removeOldTokensHandler)