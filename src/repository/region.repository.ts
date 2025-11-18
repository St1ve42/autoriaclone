import {prisma} from "../../prisma/prisma.client.ts";
import type {Region} from "../../prisma/src/generated/prisma/client.ts";

class RegionRepository{
    public async getRegionByName(name: string): Promise<Region | null>{
        return await prisma.region.findFirst({where: {name}})
    }

    public async getRegionById(id: number): Promise<Region>{
        return await prisma.region.findUnique({where: {id}}) as Region
    }



}

export const regionRepository = new RegionRepository()

