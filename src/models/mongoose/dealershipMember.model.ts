import mongoose, {model} from "mongoose";
import {Dealership} from "./dealership.model.ts";
import {DealershipRoleEnum} from "../../enums/vehicleEnums/dealership.enum.ts";
import {DealershipMemberType} from "../../types/DealershipMemberType.ts";

const DealershipMemberSchema = new mongoose.Schema({
        dealership_id: {type: mongoose.Types.ObjectId, required: true, ref: Dealership},
        user_id: {type: String, required: true, unique: true},
        role: {type: String, required: true, enum: DealershipRoleEnum},
        joinedAt: {type: Date, required: true, default: Date.now}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const DealershipMember = model<DealershipMemberType>("dealership_members", DealershipMemberSchema)