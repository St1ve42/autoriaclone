import mongoose, {model, Query} from "mongoose";
import {CurrencyEnum} from "../../enums/generalEnums/currency.enum.ts";
import {VehicleSchema} from "./vehicle.model.ts";
import {AnnouncementType} from "../../types/AnnouncementType.ts";
import {AnnouncementStatusEnum} from "../../enums/announcementEnums/announcement.status.enum.ts";
import {s3Service} from "../../services/s3.service.ts";
import {announcementService} from "../../services/announcement.service.ts";
import {Dealership} from "./dealership.model.ts";

const AnnouncementSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        city: {type: String, required: true},
        region: {type: Number, required: true},
        images: {type: [String], required: false},
        price: {type: Number, required: true},
        currency: {type: String, enum: CurrencyEnum, required: true},
        exchange_rate: {type: Map, of: {
                buy: { type: Number, required: true },
                sale: { type: Number, required: true },
                _id: false
            }, required: true},
        rate_source: {type: String, default: "PrivatBank"},
        approve_attempts: {type: Number, default: 0},
        status: {type: String, enum: AnnouncementStatusEnum},
        vehicle: {type: VehicleSchema, required: true, _id: false},
        user_id: {type: String, required: true},
        dealership_id: {type: mongoose.Types.ObjectId, required: false, ref: Dealership},
        rate_date: {type: Date, required: true, default: Date.now},
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

AnnouncementSchema.virtual('dealership', {
    ref: Dealership,
    localField: 'dealership_id',
    foreignField: '_id',
    justOne: true
})

AnnouncementSchema.pre<Query<AnnouncementType, unknown>>("findOneAndDelete", async function (next){
    const announcementId = this.getQuery()._id
    const {images} = await announcementService.get(announcementId)
    await Promise.all([...images.map(async image => await s3Service.deleteFile(image)), announcementService.update(announcementId, {images: []})])
    next()
})

export const Announcement = model<AnnouncementType>("announcements", AnnouncementSchema)

