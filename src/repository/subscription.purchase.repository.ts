import {prisma} from "../../prisma/prisma.client.ts";
import {
    SubscriptionPurchaseCreateInput,
    SubscriptionPurchaseGetPayload, SubscriptionPurchaseUpdateInput,
    SubscriptionPurchaseWhereInput
} from "../../prisma/src/generated/prisma/models/SubscriptionPurchase.ts";

export type SubscriptionPurchaseWithPlanAndUserType = SubscriptionPurchaseGetPayload<{ include: {SubscriptionPlan: true, User: { include: {Role: true, Region: true} }}}>

class SubscriptionPurchaseRepository{
    public async create(dto: SubscriptionPurchaseCreateInput): Promise<SubscriptionPurchaseWithPlanAndUserType>{
        return await prisma.subscriptionPurchase.create({data: dto, include: {SubscriptionPlan: true, User: { include: {Role: true, Region: true} }}})
    }

    public async findOneByParams(dto: SubscriptionPurchaseWhereInput): Promise<SubscriptionPurchaseWithPlanAndUserType | null> {
        return await prisma.subscriptionPurchase.findFirst({where: dto, orderBy: {purchased_at: "desc"}, include: {SubscriptionPlan: true, User: { include: {Role: true, Region: true} }}})
    }

    public async update(id: string, dto: SubscriptionPurchaseUpdateInput): Promise<SubscriptionPurchaseWithPlanAndUserType | null> {
        return await prisma.subscriptionPurchase.update({where: {id}, data: dto, include: {SubscriptionPlan: true, User: { include: {Role: true, Region: true} }}})
    }
}

export const subscriptionPurchaseRepository = new SubscriptionPurchaseRepository()