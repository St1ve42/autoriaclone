import {Router} from "express";
import {commonMiddleware} from "../../middlewares/common.middleware.ts";
import {DealershipType} from "../../types/DealershipType.ts";
import {dealerShipService} from "../../services/dealership.service.ts";
import {dealershipController} from "../../controllers/dealership.controller.ts";
import {DealershipPermissionsEnum} from "../../enums/permissionEnums/dealership.permission.enum.ts";

const router = Router()

router.post('/:dealershipId/verify', commonMiddleware.validateUserPermission(DealershipPermissionsEnum.MODERATE), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.verify)
router.post('/:dealershipId/unverify', commonMiddleware.validateUserPermission(DealershipPermissionsEnum.MODERATE), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.unverify)

export const adminDealershipsRouter = router