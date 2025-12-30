import {PremiumPurchaseCreateInput} from "../../prisma/src/generated/prisma/models/PremiumPurchase.ts";
import {prisma} from "../../prisma/prisma.client.ts";

class PremiumPurchasesRepository{
    public async create(dto: PremiumPurchaseCreateInput){
        return await prisma.premiumPurchase.create({data: dto})
    }

    public async findByUserId(id: string){
        return await prisma.premiumPurchase.findUnique({where: {user_id: id}})
    }

}

export const premiumPurchasesRepository = new PremiumPurchasesRepository()