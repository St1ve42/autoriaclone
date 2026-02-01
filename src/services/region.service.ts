import {regionRepository} from "../repository/region.repository.ts";
import {Region} from "../../prisma/src/generated/prisma/client.ts";
import {BaseQueryType} from "../types/QueryType.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {ApiError} from "../errors/api.error.ts";

class RegionService{
    public async getList(query: BaseQueryType): Promise<[Region[], number]>{
        return await regionRepository.getList(query)
    }

    public async getNameById(id: number): Promise<string>{
        const regionRecord = await regionRepository.getById(id)
        if(!regionRecord) throw new ApiError("Регіон не знайдено", StatusCodeEnum.NOT_FOUND)
        return regionRecord.name
    }

}

export const regionService = new RegionService()
