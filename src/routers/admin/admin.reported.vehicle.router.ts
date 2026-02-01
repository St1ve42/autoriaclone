import {Router} from "express";
import {commonMiddleware} from "../../middlewares/common.middleware.ts";
import {QueryValidator} from "../../vaildators/query.validator.ts";
import {reportedVehicleController} from "../../controllers/reported.vehicle.controller.ts";
import {ReportedVehiclesPermissionsEnum} from "../../enums/permissionEnums/reported.vehicles.permissions.enum.ts";
import {ReportedVehicleType} from "../../types/ReportedVehicleType.ts";
import {reportedVehicleService} from "../../services/reported.vehicle.service.ts";

const router = Router()

router.get("/", commonMiddleware.validateUserPermission(ReportedVehiclesPermissionsEnum.READ), commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), reportedVehicleController.getList)
router.post("/:reportedVehicleId/confirm", commonMiddleware.validateUserPermission(ReportedVehiclesPermissionsEnum.MODERATE), commonMiddleware.validateId("reportedVehicleId", "mongo"), commonMiddleware.validateEntityExisting<ReportedVehicleType>(reportedVehicleService,"Транспортного засобу", "reportedVehicleId"), reportedVehicleController.confirm)
router.delete("/:reportedVehicleId", commonMiddleware.validateUserPermission(ReportedVehiclesPermissionsEnum.MODERATE), commonMiddleware.validateId("reportedVehicleId", "mongo"), commonMiddleware.validateEntityExisting<ReportedVehicleType>(reportedVehicleService,"Транспортного засобу", "reportedVehicleId"), reportedVehicleController.reject)

export const adminReportedVehicleRouter = router