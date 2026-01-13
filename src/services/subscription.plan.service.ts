import {subscriptionPlanRepository} from "../repository/subscription.plan.repository.ts";
import {SubscriptionPlan} from "../../prisma/src/generated/prisma/client.ts";
import {SubscriptionPlanCreateInput, SubscriptionPlanUpdateInput} from "../../prisma/src/generated/prisma/models/SubscriptionPlan.ts";
import {SubscriptionCodeEnum} from "../enums/SubcriptionCodeEnum/subscription.code.enum.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class SubscriptionPlanService{

    public async getList(): Promise<SubscriptionPlan[]>{
        return await subscriptionPlanRepository.getList()
    }

    public async create(dto: SubscriptionPlanCreateInput): Promise<SubscriptionPlan>{
        return await subscriptionPlanRepository.create(dto)
    }

    public async update(id: string, dto: SubscriptionPlanUpdateInput){
        if(dto.code){
            const subscription = await subscriptionPlanRepository.get(id) as SubscriptionPlan
            const isSystemCode = Object.values(SubscriptionCodeEnum).some(code => code === subscription.code)
            if(isSystemCode){
                throw new ApiError("Updating system codes/names is not allowed", StatusCodeEnum.CONFLICT)
            }
        }
        return await subscriptionPlanRepository.update(id, dto)
    }

    public async findOneByParam(dto: Partial<SubscriptionPlan>){
        return await subscriptionPlanRepository.findOneByParams(dto)
    }

    public async activate(id: string){
        return await subscriptionPlanRepository.update(id, {is_active: true})
    }

    public async deactivate(id: string){
        return await subscriptionPlanRepository.update(id, {is_active: false})
    }

}

export const subscriptionPlanService = new SubscriptionPlanService()