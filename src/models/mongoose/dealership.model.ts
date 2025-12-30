import mongoose, {model} from "mongoose";
import {DealershipType} from "../../types/DealershipType.ts";

const DealershipSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: false},
        address: {type: String, required: true},
        phone: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        website: {type: String, required: false},
        owner_id: {type: String, required: true, unique: true},
        is_verified: {type: Boolean, required: true, default: false},
        rating: {type: Number, required: true, default: 0},
        logo: {type: String, required: false},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Dealership = model<DealershipType>("dealerships", DealershipSchema)
