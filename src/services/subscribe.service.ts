import {subscribeRepository} from "../repository/subscribe.repository.ts";
import {PlanSubscribeEnum} from "../../prisma/src/generated/prisma/enums.ts";

class SubscribeService{

    public async setPrice(code: PlanSubscribeEnum, price: number){
        return await subscribeRepository.update(code, {price})
    }

    public async setDuration(code: PlanSubscribeEnum, duration: number){
        return await subscribeRepository.update(code, {duration_days: duration})
    }

    public async activate(code: PlanSubscribeEnum){
        return await subscribeRepository.update(code, {is_active: true})
    }

    public async deactivate(code: PlanSubscribeEnum){
        return await subscribeRepository.update(code, {is_active: false})
    }

}

export const subscribeService = new SubscribeService()