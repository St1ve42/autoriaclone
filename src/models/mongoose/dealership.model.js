import mongoose, { model } from "mongoose";
const DealershipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    website: { type: String, required: false },
    is_verified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    logo: { type: String, required: false }
}, {
    timestamps: true,
    versionKey: false
});
export const Dealership = model("dealerships", DealershipSchema);
//# sourceMappingURL=dealership.model.js.map