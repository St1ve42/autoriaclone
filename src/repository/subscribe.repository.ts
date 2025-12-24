import {prisma} from "../../prisma/prisma.client.ts";
import {PlanSubscribeEnum} from "../../prisma/src/generated/prisma/enums.ts";
import {PremiumPlanUpdateInput} from "../../prisma/src/generated/prisma/models/PremiumPlan.ts";
import {PremiumPlan} from "../../prisma/src/generated/prisma/client.ts";

class SubscribeRepository{
    public async get(code: PlanSubscribeEnum): Promise<PremiumPlan | null>{
        return await prisma.premiumPlan.findUnique({
            where: {code}
        })
    }

    public async update(code: PlanSubscribeEnum, dto: PremiumPlanUpdateInput){
        return await prisma.premiumPlan.update({where: {code}, data: dto})
    }

}

export const subscribeRepository = new SubscribeRepository()