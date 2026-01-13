import {prisma} from "../../prisma/prisma.client.ts";
import {SubscriptionPlan} from "../../prisma/src/generated/prisma/client.ts";
import {SubscriptionPlanCreateInput, SubscriptionPlanUpdateInput} from "../../prisma/src/generated/prisma/models/SubscriptionPlan.ts";

class SubscriptionPlanRepository{
    public async getList(): Promise<SubscriptionPlan[]>{
        return await prisma.subscriptionPlan.findMany()
    }

    public async get(id: string): Promise<SubscriptionPlan | null>{
        return await prisma.subscriptionPlan.findUnique({
            where: {id}
        })
    }

    public async create(dto: SubscriptionPlanCreateInput): Promise<SubscriptionPlan>{
        return await prisma.subscriptionPlan.create({
            data: dto
        })
    }

    public async update(id: string, dto: SubscriptionPlanUpdateInput): Promise<SubscriptionPlan | null>{
        return await prisma.subscriptionPlan.update({where: {id}, data: dto})
    }

    public async findOneByParams(dto: Partial<SubscriptionPlan>): Promise<SubscriptionPlan | null>{
        return await prisma.subscriptionPlan.findFirst({where: dto})
    }


}

export const subscriptionPlanRepository = new SubscriptionPlanRepository()