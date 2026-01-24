import {SubscriptionPurchase} from "../../prisma/src/generated/prisma/client.ts";
import {SubscriptionPurchaseGetPayload} from "../../prisma/src/generated/prisma/models/SubscriptionPurchase.ts";
import {subscriptionPlanPresenter} from "./subscription.plan.presenter.ts";
import {userPresenter} from "./user.presenter.ts";

class SubscriptionPurchasePresenter{
    public res(subscriptionPurchase: SubscriptionPurchase){
        console.log(subscriptionPurchase)
        const {user_id, subscription_plan_id, ...restSubscriptionPurchase} = subscriptionPurchase
        return restSubscriptionPurchase
    }

    public userSubscriptionPurchaseRes(dto: SubscriptionPurchaseGetPayload<{ include: {SubscriptionPlan: true, User: { include: {Role: true, Region: true} }}}>){
        const {User, SubscriptionPlan, ...subscriptionPurchase} = dto
        return {
            subscription_purchase: subscriptionPurchasePresenter.res(subscriptionPurchase),
            subscription_plan: subscriptionPlanPresenter.res(SubscriptionPlan)
        }
    }

    public subscriptionPurchaseRes(dto: SubscriptionPurchaseGetPayload<{ include: {SubscriptionPlan: true, User: { include: {Role: true, Region: true} }}}>){
        const {User, SubscriptionPlan, ...subscriptionPurchase} = dto
        return {
            subscription_purchase: subscriptionPurchasePresenter.res(subscriptionPurchase),
            subscription_plan: subscriptionPlanPresenter.res(SubscriptionPlan),
            user: userPresenter.publicRes(User)
        }
    }


}

export const subscriptionPurchasePresenter = new SubscriptionPurchasePresenter()