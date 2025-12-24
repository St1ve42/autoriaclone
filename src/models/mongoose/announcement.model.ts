import mongoose, {CallbackError, model, Query, Schema} from "mongoose";
import {CurrencyEnum} from "../../enums/generalEnums/currency.enum.ts";
import {Vehicle} from "./vehicle.model.ts";
import {AnnouncementType} from "../../types/AnnouncementType.ts";
import {AnnouncementStatusEnum} from "../../enums/announcementEnums/announcement.status.enum.ts";
import {vehicleRepository} from "../../repository/vehicle.repository.ts";
import {announcementService} from "../../services/announcement.service.ts";


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
        vehicle_id: {type: Schema.Types.ObjectId, required: true, unique: true, ref: Vehicle},
        user_id: {type: String, required: true},
        dealershipId: {type: String, required: false}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

AnnouncementSchema.pre<Query<any, AnnouncementType>>("findOneAndDelete", async function(next) {
    try{
        const announcementId = this.getFilter()._id as string
        const {vehicle_id} = await announcementService.get(announcementId)
        await vehicleRepository.delete(vehicle_id)
        next()
    }
    catch (err){
        next(err as CallbackError)
    }
})

export const Announcement = model<AnnouncementType>("announcements", AnnouncementSchema)

