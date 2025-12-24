import {AveragePricesCreateInput} from "../../prisma/src/generated/prisma/models/AveragePrices.ts";
import {prisma} from "../../prisma/prisma.client.ts";
import {AveragePrices} from "../../prisma/src/generated/prisma/client.ts";
import {TimeHelper} from "../timeHelper/time.helper.ts";

class AveragePriceRepository{
    public async getInRegion(dto: Pick<AveragePricesCreateInput, "brand" | "model"> & {region_id: number}): Promise<AveragePrices | null>{
        return await prisma.averagePrices.findUnique({where: {brand_model_region_id: dto}})
    }

    public async getInCountry(dto: Pick<AveragePricesCreateInput, "brand" | "model">): Promise<{avg_country_price: number}[]>{
        return await prisma.$queryRaw`SELECT SUM(avg_price * cars_count)/SUM(cars_count) as avg_country_price FROM average_prices WHERE brand = ${dto.brand} AND model=${dto.model}`
    }

    public async create(dto: AveragePricesCreateInput): Promise<AveragePrices>{
        return await prisma.averagePrices.upsert(
            {
                where: {brand_model_region_id: {brand: dto.brand, model: dto.model, region_id: dto.region?.connect?.id || 1}}, //TODO fix
                update: {avg_price: dto.avg_price, cars_count: dto.cars_count, calculated_at: new Date()},
                create: dto
            }
        )
    }

}

export const averagePricesRepository = new AveragePriceRepository()