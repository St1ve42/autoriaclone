import mongoose, {model, Query} from "mongoose";
import {DealershipType} from "../../types/DealershipType.ts";
import {dealershipMemberRepository} from "../../repository/dealership.member.repository.ts";
import {dealershipReviewRepository} from "../../repository/dealership.review.repository.ts";

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

DealershipSchema.pre<Query<DealershipType, unknown>>("findOneAndDelete", async function (next){
    const dealership_id = this.getQuery()._id
    await dealershipMemberRepository.deleteByParams({dealership_id})
    await dealershipReviewRepository.deleteByParams({dealership_id})
})

export const Dealership = model<DealershipType>("dealerships", DealershipSchema)
