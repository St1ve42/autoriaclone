import {ApiError} from "../errors/api.error.ts";
import {regionRepository} from "../repository/region.repository.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class RegionService{
    public async getNameById(id: number): Promise<string>{
        const regionRecord = await regionRepository.getById(id)
        if(!regionRecord) throw new Error("Region not found")
        return regionRecord.name
    }

    public async getIdByName(name: string): Promise<number>{
        const regionRecord = await regionRepository.getByName(name)
        if(!regionRecord) throw new ApiError("Region not found", StatusCodeEnum.NOT_FOUND)
        return regionRecord.id
    }

}

export const regionService = new RegionService()
//TODO come up with how to dump sql db from API of ukrainian cities