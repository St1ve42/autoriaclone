import {TransmissionTypeEnum} from "../enums/vehicleEnums/transmission.type.enum.ts";
import {FuelTypeEnum} from "../enums/vehicleEnums/fuel.type.enum.ts";
import {EnvironmentalStandardEnum} from "../enums/vehicleEnums/environmental.standard.enum.ts";
import {DriveTypeEnum} from "../enums/vehicleEnums/drive.type.enum.ts";
import {PaintConditionEnum} from "../enums/vehicleEnums/paint.condition.enum.ts";
import {TechnicalConditionEnum} from "../enums/vehicleEnums/technical.condition.enum.ts";
import {VehicleTypeEnum} from "../enums/vehicleEnums/vehicle.type.enum.ts";
import {BaseType} from "./BaseType.ts";

type FuelConsumptionType = {
    city?: number;
    highway?: number;
    combined?: number;
}

type VehicleCharacteristicsType = {
    transmission?: TransmissionTypeEnum;
    fuel_type?: FuelTypeEnum;
    engine_power?: number;
    fuel_consumption?: FuelConsumptionType;
    engine_capacity?: number;
    environmental_standard?: EnvironmentalStandardEnum;
    drive_type?: DriveTypeEnum;
    door_number?: number;
    color?: string;
    metallic?: boolean;
    seat_number?: number;
    imported_from?: string;
    accident_history?: boolean;
    paint_condition?: PaintConditionEnum;
    technical_condition?: TechnicalConditionEnum;
    service_station_inspection_readiness?: boolean;
}

type VehicleType = {
    _id: string,
    brand: string;
    model: string;
    year: number;
    vehicle_type: VehicleTypeEnum;
    mileage: number;
    characteristics?: VehicleCharacteristicsType;
} & BaseType


export type {VehicleType}