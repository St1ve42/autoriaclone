import mongoose, {model} from "mongoose";
import {Dealership} from "./dealership.model.js";
import {DealershipRoleEnum} from "../../enums/dealership.enum.js";

const DealershipMemberSchema = new mongoose.Schema({
        dealershipId: {type: mongoose.Types.ObjectId, required: true, ref: Dealership},
        userId: {type: String, required: true},
        role: {type: String, required: true, enum: DealershipRoleEnum},
        joinedAt: {type: Date, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const DealershipMember = model("dealership_members", DealershipMemberSchema)