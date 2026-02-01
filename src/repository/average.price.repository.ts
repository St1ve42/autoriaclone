import {AveragePricesCreateInput, AveragePricesWhereInput} from "../../prisma/src/generated/prisma/models/AveragePrices.ts";
import {prisma} from "../../prisma/prisma.client.ts";
import {AveragePrices} from "../../prisma/src/generated/prisma/client.ts";
import {Decimal} from "@prisma/client/runtime/client";

class AveragePriceRepository{
    public async getInRegion(dto: Pick<AveragePricesCreateInput, "brand" | "model"> & {region_id: number}): Promise<Decimal | undefined>{
        return (await prisma.averagePrices.findUnique({where: {brand_model_region_id: dto}}))?.avg_price
    }

    public async getInCountry(dto: Pick<AveragePricesCreateInput, "brand" | "model">): Promise<number>{
        return (await prisma.$queryRaw`SELECT SUM(avg_price * cars_count)/SUM(cars_count) as avg_country_price FROM average_prices WHERE brand = ${dto.brand} AND model=${dto.model}` as {avg_country_price: number}[])[0].avg_country_price
    }

    public async create(dto: AveragePricesCreateInput): Promise<AveragePrices>{
        return await prisma.averagePrices.upsert(
            {
                where: {brand_model_region_id: {brand: dto.brand, model: dto.model, region_id: dto.Region?.connect?.id || 1}},
                update: {avg_price: dto.avg_price, cars_count: dto.cars_count, calculated_at: new Date()},
                create: dto
            }
        )
    }

    public async getCarCount(dto: Pick<AveragePricesCreateInput, "brand" | "model"> & {region_id?: number}){
        const {brand, model, region_id} = dto
        const filter: {where: AveragePricesWhereInput} = {where: {brand, model}}
        if(region_id){
            filter.where.region_id = region_id
        }
        return (await prisma.averagePrices.aggregate({
            _sum: {
                cars_count: true
            },
            ...filter
        }))._sum.cars_count
    }

}

export const averagePricesRepository = new AveragePriceRepository()