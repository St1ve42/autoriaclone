import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {ReportedVehicleValidator} from "../vaildators/reported.vehicle.validator.ts";
import {reportedVehicleController} from "../controllers/reported.vehicle.controller.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";

const router = Router()

router.post("/", strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(ReportedVehicleValidator.createReportedVehicle), reportedVehicleController.create)

export const reportedVehicleRouter = router