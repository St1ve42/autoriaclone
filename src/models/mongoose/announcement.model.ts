import mongoose, {model, Query} from "mongoose";
import {CurrencyEnum} from "../../enums/generalEnums/currency.enum.ts";
import {AnnouncementType} from "../../types/AnnouncementType.ts";
import {AnnouncementStatusEnum} from "../../enums/announcementEnums/announcement.status.enum.ts";
import {s3Service} from "../../services/s3.service.ts";
import {announcementService} from "../../services/announcement.service.ts";
import {Dealership} from "./dealership.model.ts";
import {VehicleTypeEnum} from "../../enums/vehicleEnums/vehicle.type.enum.ts";
import {TransmissionTypeEnum} from "../../enums/vehicleEnums/transmission.type.enum.ts";
import {FuelTypeEnum} from "../../enums/vehicleEnums/fuel.type.enum.ts";
import {EnginePowerUnits} from "../../enums/vehicleEnums/engine.power.units.ts";
import {FuelConsumptionUnits} from "../../enums/vehicleEnums/fuel.consumption.units.ts";
import {EngineCapacityUnits} from "../../enums/vehicleEnums/engine.capacity.units.ts";
import {EnvironmentalStandardEnum} from "../../enums/vehicleEnums/environmental.standard.enum.ts";
import {DriveTypeEnum} from "../../enums/vehicleEnums/drive.type.enum.ts";
import {PaintConditionEnum} from "../../enums/vehicleEnums/paint.condition.enum.ts";
import {TechnicalConditionEnum} from "../../enums/vehicleEnums/technical.condition.enum.ts";

export const AnnouncementVehicleSchema = new mongoose.Schema(
    {
        brand: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Number, required: true},
        vehicle_type: {type: String, enum: VehicleTypeEnum, required: true},
        mileage: {type: Number, required: true},
        characteristics: {
            transmission: {type: String, required: false, enum: TransmissionTypeEnum},
            fuel_type: {type: String, required: false, enum: FuelTypeEnum},
            engine_power: {value: Number, unit: {type: String, required: false, enum: EnginePowerUnits}, _id: false},
            fuel_consumption: {
                city: Number,
                highway: Number,
                combined: Number,
                unit: {type: String, required: false, enum: FuelConsumptionUnits}
            },
            engine_capacity: {value: Number, unit: {type: String, required: true, enum: EngineCapacityUnits}, _id: false},
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

const AnnouncementSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        city: {type: String, required: true},
        region_id: {type: Number, required: true},
        images: {type: [String], required: false},
        price: {type: Number, required: true},
        currency: {type: String, enum: CurrencyEnum, required: true},
        exchange_rate: {type: Map, of: {
                buy: { type: Number, required: true },
                sale: { type: Number, required: true },
                _id: false
            }, required: true},
        rate_source: {type: String, default: "PrivatBank"},
        approve_attempts: {type: Number, default: 0},
        status: {type: String, enum: AnnouncementStatusEnum},
        vehicle: {type: AnnouncementVehicleSchema, required: true, _id: false},
        user_id: {type: String, required: true},
        dealership_id: {type: mongoose.Types.ObjectId, required: false, ref: Dealership},
        rate_date: {type: Date, required: true, default: Date.now},
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

AnnouncementSchema.virtual('dealership', {
    ref: Dealership,
    localField: 'dealership_id',
    foreignField: '_id',
    justOne: true
})

AnnouncementSchema.pre<Query<AnnouncementType, unknown>>("findOneAndDelete", async function (next){
    const announcementId = this.getQuery()._id
    const {images} = await announcementService.get(announcementId)
    await Promise.all([...images.map(async image => await s3Service.deleteFile(image)), announcementService.update(announcementId, {images: []})])
    next()
})

export const Announcement = model<AnnouncementType>("announcements", AnnouncementSchema)

