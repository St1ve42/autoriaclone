import {Router} from "express";
import {vehicleController} from "../controllers/vehicle.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import {VehicleValidator} from "../vaildators/vehicle.validator.ts";
import {vehicleService} from "../services/vehicle.service.ts";
import {VehicleType} from "../types/VehicleType.ts";

const router = Router()

router.get('/', commonMiddleware.validateQuery(QueryValidator.vehicleValidator), vehicleController.getList)
router.get('/:vehicleId', commonMiddleware.validateId("vehicleId", "mongo"), commonMiddleware.validateEntityExisting<VehicleType>(vehicleService, "Vehicle", "vehicleId"), vehicleController.get)
router.post('/', commonMiddleware.validateBody(VehicleValidator.createVehicle), vehicleController.create)
router.delete('/:vehicleId', commonMiddleware.validateId("vehicleId", "mongo"), commonMiddleware.validateEntityExisting<VehicleType>(vehicleService, "Vehicle", "vehicleId"), vehicleController.delete)
router.patch('/:vehicleId', commonMiddleware.validateId("vehicleId", "mongo"), commonMiddleware.validateEntityExisting<VehicleType>(vehicleService, "Vehicle", "vehicleId"), commonMiddleware.validateBody(VehicleValidator.updateVehicle), vehicleController.update)

export const vehicleRouter = router