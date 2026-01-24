import {subscriptionPurchaseRepository, SubscriptionPurchaseWithPlanAndUserType} from "../repository/subscription.purchase.repository.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {subscriptionPlanService} from "./subscription.plan.service.ts";
import {userService} from "./user.service.ts";
import {Utils} from "../utils/utils.ts";
import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import {TimeHelper} from "../timeHelper/time.helper.ts";
import {AccountTypeEnum} from "../../prisma/src/generated/prisma/enums.ts";
import {SubscriptionPurchaseWhereInput} from "../../prisma/src/generated/prisma/models/SubscriptionPurchase.ts";

class SubscriptionPurchaseService{
    public async purchase(planId: string, userId: string){
        const subscription = await subscriptionPurchaseRepository.findOneByParams({user_id: userId})
        if(subscription){
            const isActive = SubscriptionPurchaseService.checkSubscriptionIsActive(subscription)
            if(isActive){
                throw new ApiError("Користувач має вже активну підписку", StatusCodeEnum.CONFLICT)
            }
        }
        const {is_active, price, currency: subscriptionPlanCurrency, duration_days, id: subscriptionPlanId, code} = await subscriptionPlanService.get(planId)
        if(!is_active){
            throw new ApiError("Підписка не активна", StatusCodeEnum.BAD_REQUEST)
        }
        const {balance, currency: userCurrency} = await userService.get(userId)
        const {value: normalizedPrice} = await Utils.normalizeToCurrency(price, subscriptionPlanCurrency as CurrencyEnum, userCurrency as CurrencyEnum)
        const diff = balance - normalizedPrice
        if(diff < 0){
            throw new ApiError("Недостатньо коштів для здійснення операції", StatusCodeEnum.PAYMENT_REQUIRED)
        }
        const purchase = await subscriptionPurchaseRepository.create({price_paid: normalizedPrice, currency: userCurrency, purchased_at: new Date(), expires_at: TimeHelper.addTime(duration_days ?? 30, "d"), SubscriptionPlan: {connect: {id: subscriptionPlanId}}, User: {connect: {id: userId}}})
        await userService.update(userId, {balance: diff, account_type: code as AccountTypeEnum})
        return purchase
    }

    public async findOneByParams(dto: SubscriptionPurchaseWhereInput){
        const subscription = await subscriptionPurchaseRepository.findOneByParams(dto)
        if(!subscription){
            throw new ApiError("Користувач не має активної підписки", StatusCodeEnum.NOT_FOUND)
        }
        const isActive = SubscriptionPurchaseService.checkSubscriptionIsActive(subscription)
        if(!isActive){
            throw new ApiError("Користувач не має активної підписки", StatusCodeEnum.NOT_FOUND)
        }
        return await subscriptionPurchaseRepository.findOneByParams(dto)
    }

    private static checkSubscriptionIsActive(subscription: SubscriptionPurchaseWithPlanAndUserType){
        const {purchased_at, expires_at} = subscription
        const checkAt = new Date()
        return purchased_at < checkAt && checkAt < expires_at
    }

}

export const subscriptionPurchaseService = new SubscriptionPurchaseService()