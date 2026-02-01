import type {MakeType, ModelListType, ModelResponseType, ModelType, VehicleType} from "../types/VehicleType.ts";
import {vehicleRepository} from "../repository/vehicle.repository.ts";
import {BaseQueryType} from "../types/QueryType.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class VehicleService{
    public async get(makeId: string): Promise<VehicleType>{
        return await vehicleRepository.getByMakeId(makeId) as VehicleType
    }

    public async getMakeList(query: BaseQueryType): Promise<[MakeType[],number]> {
        return await vehicleRepository.getMakeList(query)
    }

    public async getModelList(makeId: string, query: BaseQueryType): Promise<[ModelListType, number]> {
        return await vehicleRepository.getModels(makeId, query)
    }

    public async getModel(makeId: string, modelId: string, query: BaseQueryType): Promise<[ModelResponseType, number]>{
        const isBelongs = await vehicleRepository.isModelBelongsToMake(makeId, modelId)
        if(!isBelongs){
            throw new ApiError("Модель не належить поточному бренду", StatusCodeEnum.NOT_FOUND)
        }
        const [model, total] = await vehicleRepository.getModel(makeId, modelId, query)
        return [model, total]
    }



}

export const vehicleService = new VehicleService()