import type {VehicleType} from "../types/VehicleType.ts";
import {vehicleRepository} from "../repository/vehicle.repository.ts";
import {VehicleQueryType} from "../types/QueryType.ts";
import {VehicleListReturnType} from "../types/ListReturnType.ts";

class VehicleService{
    public async getList(query: VehicleQueryType): Promise<VehicleListReturnType>{
        return await vehicleRepository.getList(query)
    }

    public async get(id: string): Promise<VehicleType>{
        return await vehicleRepository.get(id) as VehicleType
    }

    public async create(dto: VehicleType): Promise<VehicleType>{
        return await vehicleRepository.create(dto)
    }

    public async delete(id: string){
        return await vehicleRepository.delete(id) as VehicleType
    }

    public async update(id: string, dto: VehicleType){
        return await vehicleRepository.update(id, dto) as VehicleType
    }
}

export const vehicleService = new VehicleService()