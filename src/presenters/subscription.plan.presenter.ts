import {SubscriptionPlan} from "../../prisma/src/generated/prisma/client.ts";

class SubscriptionPlanPresenter{
    public res(subscriptionPlan: SubscriptionPlan){
        const {is_active, ...restSubscriptionPlan} = subscriptionPlan
        return restSubscriptionPlan
    }


}

export const subscriptionPlanPresenter = new SubscriptionPlanPresenter()