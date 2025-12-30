import {Vehicle} from "../models/mongoose/vehicle.model.ts";
import type {VehicleType} from "../types/VehicleType.ts";
import {VehicleQueryType} from "../types/QueryType.ts";
import {FilterQuery} from "mongoose";
import {SortQuery} from "../types/SortQuery.ts";
import {VehicleOrderByEnum} from "../enums/vehicleEnums/vehicle.order.by.enum.ts";
import {VehicleListReturnType} from "../types/ListReturnType.ts";

class VehicleRepository{
    public async getList(query: VehicleQueryType): Promise<VehicleListReturnType>{
        const {page, limit, skip, search, searchBy, orderBy, order} = query
        let filter: FilterQuery<VehicleType> = {}
        let sort: SortQuery<typeof VehicleOrderByEnum> = {}
        if(search && search_by){
            filter[search_by] = {$regex: search, $options: "i"}
        }
        if(order_by && order){
            sort[order_by] = order
        }
        return await Promise.all([Vehicle.find(filter).limit(limit).skip((page-1)*limit + skip).sort(sort), Vehicle.countDocuments(filter)])
    }

    public async get(id: string): Promise<VehicleType | null>{
        return await Vehicle.findById(id)
    }

    public async getListAll(): Promise<VehicleType[]>{
        return await Vehicle.find({})
    }

    public async create(dto: VehicleType): Promise<VehicleType>{
        return await Vehicle.create(dto)
    }

    public async delete(id: string): Promise<VehicleType | null>{
        return await Vehicle.findByIdAndDelete(id)
    }

    public async update(id: string, dto: VehicleType): Promise<VehicleType | null>{
        return await Vehicle.findByIdAndUpdate(id, dto, {new: true})
    }


}

export const vehicleRepository = new VehicleRepository()