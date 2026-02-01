import {model, Schema} from "mongoose";
import {ReportedVehicleType} from "../../types/ReportedVehicleType.ts";

const ReportedVehicleSchema = new Schema(
    {
        make_name: {type: String, required: true},
        model: {
            model_name: {type: String, required: true},
            vehicle_type: {type: String, required: true},
            year: {type: Number, required: true},
            _id: false
        },
        user_id: {type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const ReportedVehicleModel = model<ReportedVehicleType>( "reported_vehicles", ReportedVehicleSchema)