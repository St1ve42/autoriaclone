import mongoose, { model } from "mongoose";
import { Dealership } from "./dealership.model.js";
const DealershipReviewSchema = new mongoose.Schema({
    dealershipId: { type: mongoose.Types.ObjectId, required: true, ref: Dealership },
    authorId: { type: String, require: true },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    text: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});
export const DealershipReview = model("dealer_reviews", DealershipReviewSchema);
//# sourceMappingURL=dealershipReview.model.js.map