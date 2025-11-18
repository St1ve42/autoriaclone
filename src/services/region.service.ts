import {ApiError} from "../errors/api.error.ts";
import {regionRepository} from "../repository/region.repository.ts";

class RegionService{
    public async getRegionName(id: number): Promise<string>{
        const regionRecord = await regionRepository.getRegionById(id)
        if(!regionRecord) throw new ApiError("Region not found", 500)
        return regionRecord.name
    }

    public async getRegionId(name: string): Promise<number>{
        const regionRecord = await regionRepository.getRegionByName(name)
        if(!regionRecord) throw new ApiError("Region not found", 400)
        return regionRecord.id
    }

}

export const regionService = new RegionService()