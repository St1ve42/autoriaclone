import {BaseQueryType} from "../types/QueryType.ts";
import {CreateReportedVehicleDTOType, ReportedVehicleType} from "../types/ReportedVehicleType.ts";
import {ReportedVehicleModel} from "../models/mongoose/reported.vehicle.model.ts";
import {FilterQuery} from "mongoose";

class ReportedVehicleRepository{
    public async create(dto: CreateReportedVehicleDTOType & {user_id: string}): Promise<ReportedVehicleType>{
        return await ReportedVehicleModel.create(dto)
    }

    public async getList(query: BaseQueryType): Promise<[ReportedVehicleType[], number]>{
        const {page, limit, skip} = query
        return await Promise.all([ReportedVehicleModel.find({}).limit(limit).skip((page-1)*limit + skip), ReportedVehicleModel.countDocuments({})])
    }

    public async get(id: string): Promise<ReportedVehicleType | null>{
        return await ReportedVehicleModel.findById(id)
    }

    public async isReportedVehicleExists(dto: Partial<Omit<CreateReportedVehicleDTOType,"make_name">> & Pick<CreateReportedVehicleDTOType, "make_name">): Promise<boolean>{
        const {make_name, model} = dto
        const filter: FilterQuery<ReportedVehicleType> = {"make_name": make_name}
        if(model){
            filter["model"] = {
                ...model,
            }
        }
        return !!(await ReportedVehicleModel.findOne(filter))
    }

    public async delete(id: string): Promise<ReportedVehicleType | null>{
        return await ReportedVehicleModel.findByIdAndDelete(id)
    }

}

export const reportedVehicleRepository = new ReportedVehicleRepository()