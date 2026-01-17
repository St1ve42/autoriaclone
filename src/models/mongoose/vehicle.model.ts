import mongoose, {model} from "mongoose";
import {OldVehicleType} from "../../types/VehicleType.ts";

export const VehicleSchema = new mongoose.Schema({}, {strict: false})

export const Vehicle = model<OldVehicleType>("vehicles", VehicleSchema, "vehicles")

