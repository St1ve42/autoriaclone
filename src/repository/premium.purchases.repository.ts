import {PremiumPurchaseCreateInput} from "../../prisma/src/generated/prisma/models/PremiumPurchase.ts";
import {prisma} from "../../prisma/prisma.client.ts";

class PremiumPurchasesRepository{
    public async create(dto: PremiumPurchaseCreateInput){
        return await prisma.premiumPurchase.create({data: dto})
    }
}

export const premiumPurchasesRepository = new PremiumPurchasesRepository()