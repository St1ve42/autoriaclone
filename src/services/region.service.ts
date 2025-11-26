import {ApiError} from "../errors/api.error.ts";
import {regionRepository} from "../repository/region.repository.ts";
import {StatusCodeEnum} from "../enums/status.code.enum.ts";

class RegionService{
    public async getRegionName(id: number): Promise<string>{
        const regionRecord = await regionRepository.getRegionById(id)
        if(!regionRecord) throw new Error("Region not found")
        return regionRecord.name
    }

    public async getRegionId(name: string): Promise<number>{
        const regionRecord = await regionRepository.getRegionByName(name)
        if(!regionRecord) throw new ApiError("Region not found", StatusCodeEnum.NOT_FOUND)
        return regionRecord.id
    }

}

export const regionService = new RegionService()