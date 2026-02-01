import mongoose, {model} from "mongoose";
import {Dealership} from "./dealership.model.ts";
import {DealershipReviewType} from "../../types/DealershipReviewType.ts";

const DealershipReviewSchema = new mongoose.Schema(
    {
        dealership_id: {type: mongoose.Types.ObjectId, required: true, ref: 'Dealership'},
        author_id: {type: String, required: true},
        rating: {type: Number, required: true},
        text: {type: String, required: true},

    },
    {
        timestamps: true,
        versionKey: false
    }
)

DealershipReviewSchema.index({dealership_id: 1, author_id: 1}, {unique: true})

export const DealershipReview = model<DealershipReviewType>("dealership_reviews", DealershipReviewSchema)

