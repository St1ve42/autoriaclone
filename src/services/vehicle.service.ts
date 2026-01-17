import type {MakeType, ModelListType, ModelType} from "../types/VehicleType.ts";
import {vehicleRepository} from "../repository/vehicle.repository.ts";
import {BaseQuery} from "../types/QueryType.ts";
import {VehicleListReturnType} from "../types/ListReturnType.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class VehicleService{
    public async get(makeId: string): Promise<VehicleListReturnType>{
        return await vehicleRepository.getByMakeId(makeId)
    }

    public async getMakeList(query: BaseQuery): Promise<[MakeType[],number]> {
        return await vehicleRepository.getMakeList(query)
    }

    public async getModelList(makeId: string, query: BaseQuery): Promise<[ModelListType, number]> {
        return await vehicleRepository.getModels(makeId, query)
    }

    public async getModel(makeId: string, modelId: string, query: BaseQuery): Promise<ModelType>{
        const isBelongs = await vehicleRepository.isModelBelongsToMake(makeId, modelId)
        if(!isBelongs){
            throw new ApiError("Model doesn't belong to model", StatusCodeEnum.CONFLICT)
        }
        const [model, total] = await vehicleRepository.getModel(makeId, modelId, query)
        return [model, total]
    }



}

export const vehicleService = new VehicleService()