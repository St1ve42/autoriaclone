import {TransmissionTypeEnum} from "../enums/vehicleEnums/transmission.type.enum.ts";
import {FuelTypeEnum} from "../enums/vehicleEnums/fuel.type.enum.ts";
import {EnvironmentalStandardEnum} from "../enums/vehicleEnums/environmental.standard.enum.ts";
import {DriveTypeEnum} from "../enums/vehicleEnums/drive.type.enum.ts";
import {PaintConditionEnum} from "../enums/vehicleEnums/paint.condition.enum.ts";
import {TechnicalConditionEnum} from "../enums/vehicleEnums/technical.condition.enum.ts";
import {VehicleTypeEnum} from "../enums/vehicleEnums/vehicle.type.enum.ts";

export type FuelConsumptionDto = {
    city?: number;
    highway?: number;
    combined?: number;
}

export type VehicleCharacteristicsDto = {
    transmission?: TransmissionTypeEnum;
    fuel_type?: FuelTypeEnum;
    engine_power?: number; // к.с.
    fuel_consumption?: FuelConsumptionDto;
    engine_capacity?: number; // л
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

export type AnnouncementVehicleType = {
    brand: string;
    model: string;
    year: number;
    vehicle_type: VehicleTypeEnum;
    mileage: number;
    characteristics?: VehicleCharacteristicsDto;
}

