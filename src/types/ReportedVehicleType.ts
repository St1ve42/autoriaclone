import {BaseType} from "./BaseType.ts";

type ReportedVehicleModelType = {
    model_name: string,
    vehicle_type: string,
    year: number
}

type ReportedVehicleType = {
    _id: string
    make_name: string,
    model: ReportedVehicleModelType,
    user_id: string
} & BaseType

type CreateReportedVehicleDTOType = Omit<ReportedVehicleType, "_id" | "user_id">
type UpdateReportedVehicleDTOType = {model: Partial<ReportedVehicleModelType>}

export type {ReportedVehicleType, CreateReportedVehicleDTOType, ReportedVehicleModelType, UpdateReportedVehicleDTOType}