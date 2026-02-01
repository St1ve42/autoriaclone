import {BaseQueryType} from "../types/QueryType.ts";
import {reportedVehicleRepository} from "../repository/reported.vehicle.repository.ts";
import {CreateReportedVehicleDTOType, ReportedVehicleType} from "../types/ReportedVehicleType.ts";
import {vehicleRepository} from "../repository/vehicle.repository.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";

class ReportedVehicleService{
    public async get(id: string): Promise<ReportedVehicleType>{
        return await reportedVehicleRepository.get(id) as ReportedVehicleType
    }

    public async create(dto: CreateReportedVehicleDTOType, user_id: string): Promise<ReportedVehicleType>{
        const isVehicleExists = await vehicleRepository.isVehicleExists(dto)
        if(isVehicleExists){
            throw new ApiError("Транспорт з такими даними вже існує", StatusCodeEnum.CONFLICT)
        }
        const isReportedVehicleExists = await reportedVehicleRepository.isReportedVehicleExists(dto)
        if(isReportedVehicleExists){
            throw new ApiError("Транспорт з такими даними вже на розгляді", StatusCodeEnum.CONFLICT)
        }
        return await reportedVehicleRepository.create({...dto, user_id})
    }

    public async getList(query: BaseQueryType): Promise<[ReportedVehicleType[], number]>{
        return await reportedVehicleRepository.getList(query)
    }

    public async confirm(id: string): Promise<ReportedVehicleType>{
        const reportedVehicle = await reportedVehicleService.get(id)
        await vehicleRepository.update(reportedVehicle)
        return await reportedVehicleRepository.delete(id) as ReportedVehicleType
    }

    public async delete(id: string): Promise<ReportedVehicleType>{
        return await reportedVehicleRepository.delete(id) as ReportedVehicleType
    }


}

export const reportedVehicleService = new ReportedVehicleService()