import {prisma} from "../../prisma/prisma.client.ts";
import type {Region} from "../../prisma/src/generated/prisma/client.ts";
import {BaseQueryType} from "../types/QueryType.ts";

class RegionRepository{
    public async getList(query: BaseQueryType): Promise<Region[]>{
        const {limit, skip, page} = query
        return await Promise.all([await prisma.region.findMany({take: limit, skip: (page-1)*limit + skip}), await prisma.region.count()])
    }

    public async getByName(name: string): Promise<Region | null>{
        return await prisma.region.findFirst({where: {name}})
    }

    public async getById(id: number): Promise<Region>{
        return await prisma.region.findUnique({where: {id}}) as Region
    }



}

export const regionRepository = new RegionRepository()

