import {regionRepository} from "../repository/region.repository.ts";
import {Region} from "../../prisma/src/generated/prisma/client.ts";

class RegionService{
    public async getList(): Promise<Region[]>{
        return await regionRepository.getList()
    }

    public async getNameById(id: number): Promise<string>{
        const regionRecord = await regionRepository.getById(id)
        if(!regionRecord) throw new Error("Region not found")
        return regionRecord.name
    }

}

export const regionService = new RegionService()
