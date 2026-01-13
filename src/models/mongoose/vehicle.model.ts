import mongoose, {model} from "mongoose";
import {VehicleType} from "../../types/VehicleType.ts";

export const VehicleSchema = new mongoose.Schema(
    {
        brand: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Number, required: true},
    }
)

export const Vehicle = model<VehicleType>("vehicles", VehicleSchema)

