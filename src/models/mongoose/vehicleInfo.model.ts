import mongoose, {model} from "mongoose";
import {VehicleTypeEnum} from "../../enums/vehicle.type.enum.js";
import {TransmissionTypeEnum} from "../../enums/transmission.type.enum.js";
import {FuelTypeEnum} from "../../enums/fuel.type.enum.js";
import {EnvironmentalStandardEnum} from "../../enums/environmental.standard.enum.js";
import {DriveTypeEnum} from "../../enums/drive.type.enum.js";
import {PaintConditionEnum} from "../../enums/paint.condition.enum.js";
import {TechnicalConditionEnum} from "../../enums/technical.condition.enum.js";

const VehicleSchema = new mongoose.Schema(
    {
        brand: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: String, required: true},
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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Vehicle = model("vehicles", VehicleSchema)

//TODO commit after making schemas
//TODO types for models