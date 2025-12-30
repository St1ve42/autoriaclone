import {ApiError} from "../errors/api.error.ts";
import {regionRepository} from "../repository/region.repository.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
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

    public async getIdByName(name: string): Promise<number>{
        const regionRecord = await regionRepository.getByName(name)
        if(!regionRecord) throw new ApiError("Region not found", StatusCodeEnum.NOT_FOUND)
        return regionRecord.id
    }

}

export const regionService = new RegionService()
