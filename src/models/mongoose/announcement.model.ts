import mongoose, {model} from "mongoose";
import {CurrencyEnum} from "../../enums/currency.enum.ts";

const AnnouncementSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        city: {type: String, required: true},
        region: {type: String, required: true}, //TODO enum
        images: {type: [String], required: true},
        price: {type: Number, default: 0},
        currency: {type: String, enum: CurrencyEnum, default: CurrencyEnum.UAH},
        currency_value: {type: Number, default: 0},
        rate_source: {type: String, default: "PrivatBank"}, //TODO check PrivatBank API
        rate_date: {type: Date},
        approve_attempts: {type: String, default: 0},
        is_active: {type: Boolean, default: false},
        vehicle_id: {type: String, required: true},
        user_id: {type: String, required: true},
        dealershipId: {type: String, require: false}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Announcement = model("announcements", AnnouncementSchema)