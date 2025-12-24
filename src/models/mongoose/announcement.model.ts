import mongoose, {model} from "mongoose";
import {CurrencyEnum} from "../../enums/generalEnums/currency.enum.ts";
import {VehicleSchema} from "./vehicle.model.ts";
import {AnnouncementType} from "../../types/AnnouncementType.ts";
import {AnnouncementStatusEnum} from "../../enums/announcementEnums/announcement.status.enum.ts";

const AnnouncementSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        city: {type: String, required: true},
        region: {type: String, required: true}, //TODO validating in annoucement validator
        images: {type: [String], required: false},
        price: {type: Number, required: true},
        currency: {type: String, enum: CurrencyEnum, required: true},
        exchange_rate: {type: Map, of: {
                buy: { type: Number, required: true },
                sale: { type: Number, required: true },
                _id: false
            }, required: true},
        rate_source: {type: String, default: "PrivatBank"},
        rate_date: {type: Date, required: true, default: new Date().toISOString()},
        approve_attempts: {type: Number, default: 0},
        status: {type: String, enum: AnnouncementStatusEnum},
        vehicle: {type: VehicleSchema, required: true, _id: false},
        user_id: {type: String, required: true},
        dealershipId: {type: String, required: false}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Announcement = model<AnnouncementType>("announcements", AnnouncementSchema)

