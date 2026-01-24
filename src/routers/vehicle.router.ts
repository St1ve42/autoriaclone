import {Router} from "express";
import {vehicleController} from "../controllers/vehicle.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import {VehicleValidator} from "../vaildators/vehicle.validator.ts";
import {vehicleService} from "../services/vehicle.service.ts";
import {MakeType, ModelType, OldVehicleType} from "../types/VehicleType.ts";

const router = Router()

router.get('/makes', commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), vehicleController.getMakeList)
router.get('/makes/:makeId/models', commonMiddleware.validateId("makeId", "mongo"), commonMiddleware.validateEntityExisting<MakeType>(vehicleService, "make", "makeId"), commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), vehicleController.getModelList)
router.get('/makes/:makeId/models/:modelId', commonMiddleware.validateId("makeId", "mongo"), commonMiddleware.validateId("modelId", "mongo"), commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), vehicleController.getModel)

export const vehicleRouter = router