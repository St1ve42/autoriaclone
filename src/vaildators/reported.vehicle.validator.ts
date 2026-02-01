import joi from "joi";
import {ReportedVehicleRegexpEnum} from "../enums/reportedVehicleEnums/reported.vehicle.regexp.enum.ts";

export class ReportedVehicleValidator{
    private static make_name = joi.string().pattern(ReportedVehicleRegexpEnum.MAKE_NAME).trim().uppercase()

    private static model = joi.object({
        model_name: joi.string().pattern(ReportedVehicleRegexpEnum.MODEL_NAME).trim().uppercase().required(),
        vehicle_type: joi.string().pattern(ReportedVehicleRegexpEnum.VEHICLE_TYPE).trim().required(),
        year: joi.number().min(1900).required()
    })

    public static createReportedVehicle = joi.object({
        make_name: this.make_name.required(),
        model: this.model.required()
    })

}