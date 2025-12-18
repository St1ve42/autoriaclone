import mongoose, {CallbackError, model, Query} from "mongoose";
import {VehicleTypeEnum} from "../../enums/vehicleEnums/vehicle.type.enum.js";
import {TransmissionTypeEnum} from "../../enums/vehicleEnums/transmission.type.enum.js";
import {FuelTypeEnum} from "../../enums/vehicleEnums/fuel.type.enum.js";
import {EnvironmentalStandardEnum} from "../../enums/vehicleEnums/environmental.standard.enum.js";
import {DriveTypeEnum} from "../../enums/vehicleEnums/drive.type.enum.js";
import {PaintConditionEnum} from "../../enums/vehicleEnums/paint.condition.enum.js";
import {TechnicalConditionEnum} from "../../enums/vehicleEnums/technical.condition.enum.js";
import {VehicleType} from "../../types/VehicleType.ts";
import {AnnouncementType} from "../../types/AnnouncementType.ts";
import {announcementService} from "../../services/announcement.service.ts";
import {vehicleRepository} from "../../repository/vehicle.repository.ts";
import {announcementRepository} from "../../repository/announcement.repository.ts";

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

// VehicleSchema.pre<Query<any, VehicleType>>("findOneAndDelete", async function(next) {
//     try{
//         const vehicleId = this.getFilter()._id as string
//         const {vehicle_id} = await announcementRepository.findByParams({vehicle_id: vehicleId}) as AnnouncementType
//         await announcementService.delete(vehicle_id)
//         next()
//     }
//     catch (err){
//         next(err as CallbackError)
//     }
// })

export const Vehicle = model<VehicleType>("vehicles", VehicleSchema)

