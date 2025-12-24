import {TransmissionTypeEnum} from "../enums/vehicleEnums/transmission.type.enum.ts";
import {FuelTypeEnum} from "../enums/vehicleEnums/fuel.type.enum.ts";
import {EnvironmentalStandardEnum} from "../enums/vehicleEnums/environmental.standard.enum.ts";
import {DriveTypeEnum} from "../enums/vehicleEnums/drive.type.enum.ts";
import {PaintConditionEnum} from "../enums/vehicleEnums/paint.condition.enum.ts";
import {TechnicalConditionEnum} from "../enums/vehicleEnums/technical.condition.enum.ts";
import joi from "joi";
import {VehicleTypeEnum} from "../enums/vehicleEnums/vehicle.type.enum.ts";
import {VehicleRegexpEnum} from "../enums/vehicleEnums/vehicle.regexp.enum.ts";

export class VehicleValidator{
    private static fuelConsumption = joi.object({
        city:  joi.number().max(80),
        highway:  joi.number().max(80),
        combined:  joi.number().max(80)
    }) // 1 л / 100 км

    private static vehicleCharacteristics = joi.object({
            transmission:  joi.string().valid(...Object.values(TransmissionTypeEnum)).trim(),
            fuel_type:  joi.string().valid(...Object.values(FuelTypeEnum)).trim(),
            engine_power:  joi.number().min(20).max(2000), //к.с.
            fuel_consumption: this.fuelConsumption,
            engine_capacity:  joi.number(), //л
            environmental_standard:  joi.string().valid(...Object.values(EnvironmentalStandardEnum)).trim(),
            drive_type:  joi.string().valid(...Object.values(DriveTypeEnum)).trim(),
            door_number:  joi.number().min(1).max(6),
            color:  joi.string().pattern(VehicleRegexpEnum.COLOR).trim(),
            metallic:  joi.boolean(),
            seat_number:  joi.number().min(1).max(70),
            imported_from:  joi.string().pattern(VehicleRegexpEnum.IMPORTED_FROM).trim(),
            accident_history:  joi.boolean(),
            paint_condition:  joi.string().valid(...Object.values(PaintConditionEnum)).trim(),
            technical_condition:  joi.string().valid(...Object.values(TechnicalConditionEnum)).trim(),
            service_station_inspection_readiness:  joi.boolean(),
        })

    private static brand = joi.string().pattern(VehicleRegexpEnum.BRAND).trim();
    private static model = joi.string().pattern(VehicleRegexpEnum.MODEL).trim();
    private static year = joi.number().min(1900).max(2025);
    private static vehicle_type = joi.string().valid(...Object.values(VehicleTypeEnum)).trim();
    private static mileage = joi.number();
    private static characteristics = this.vehicleCharacteristics;

    public static createVehicle = joi.object({
        brand: this.brand.required(),
        model: this.model.required(),
        year: this.year.required(),
        vehicle_type: this.vehicle_type.required(),
        mileage: this.mileage.required(),
        characteristics: this.characteristics
    })

    public static updateVehicle = joi.object({
        brand: this.brand,
        model: this.model,
        year: this.year,
        vehicle_type: this.vehicle_type,
        mileage: this.mileage,
        characteristics: this.characteristics
    })

}