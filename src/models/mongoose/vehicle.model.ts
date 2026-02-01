import mongoose, {model} from "mongoose";
import type {OldVehicleType} from "../../types/VehicleType.ts";

export const VehicleSchema = new mongoose.Schema({}, {strict: false, versionKey: false, timestamps: true})

export const Vehicle = model<OldVehicleType>("vehicles", VehicleSchema, "vehicles")

