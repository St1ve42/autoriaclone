import mongoose, {model} from "mongoose";
import {VehicleTypeEnum} from "../../enums/vehicleEnums/vehicle.type.enum.ts";
import {TransmissionTypeEnum} from "../../enums/vehicleEnums/transmission.type.enum.ts";
import {FuelTypeEnum} from "../../enums/vehicleEnums/fuel.type.enum.ts";
import {EnvironmentalStandardEnum} from "../../enums/vehicleEnums/environmental.standard.enum.ts";
import {DriveTypeEnum} from "../../enums/vehicleEnums/drive.type.enum.ts";
import {PaintConditionEnum} from "../../enums/vehicleEnums/paint.condition.enum.ts";
import {TechnicalConditionEnum} from "../../enums/vehicleEnums/technical.condition.enum.ts";
import {VehicleType} from "../../types/VehicleType.ts";

export const VehicleSchema = new mongoose.Schema(
    {
        brand: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Number, required: true},
        vehicle_type: {type: String, enum: VehicleTypeEnum, required: true},
        mileage: {type: Number, required: true},
        characteristics: {
            transmission: {type: String, required: false, enum: TransmissionTypeEnum},
            fuel_type: {type: String, required: false, enum: FuelTypeEnum},
            engine_power: {type: Number, required: false},
            fuel_consumption: {
                city: {type: Number, required: false},
                highway: {type: Number, required: false},
                combined: {type: Number, required: false}
            },
            engine_capacity: {type: Number, required: false},
            environmental_standard: {type: String, required: false, enum: EnvironmentalStandardEnum},
            drive_type: {type: String, required: false, enum: DriveTypeEnum},
            door_number: {type: Number, required: false, max: 6},
            color: {type: String, required: false},
            metallic: {type: Boolean, required: false},
            seat_number: {type: Number, required: false},
            imported_from: {type: String, required: false},
            accident_history: {type: Boolean, required: false},
            paint_condition: {type: String, required: false, enum: PaintConditionEnum},
            technical_condition: {type: String, required: false, enum: TechnicalConditionEnum},
            service_station_inspection_readiness: {type: Boolean, required: false}
        }
    }
)

export const Vehicle = model<VehicleType>("vehicles", VehicleSchema)

