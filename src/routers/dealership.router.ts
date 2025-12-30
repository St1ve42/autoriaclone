import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {DealershipValidator} from "../vaildators/dealership.validator.ts";
import {dealershipController} from "../controllers/dealership.controller.ts";
import {DealershipType} from "../types/DealershipType.ts";
import {dealerShipService} from "../services/dealership.service.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {dealershipLogoConfig} from "../constants/dealership.logo.constant.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";

const router = Router()

router.post('/', authMiddleware.validateAccessToken, commonMiddleware.validateBody(DealershipValidator.createValidator), dealershipController.create)
router.get('/', dealershipController.getList)
router.get('/:dealershipId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.get)
router.put('/:dealershipId', authMiddleware.validateAccessToken, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateBody(DealershipValidator.updateValidator), dealershipController.update)
router.delete('/:dealershipId', authMiddleware.validateAccessToken, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.delete)
router.post('/:dealershipId/logo', authMiddleware.validateAccessToken, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), fileMiddleware.validateFile("logo", dealershipLogoConfig), dealershipController.uploadLogo)
router.delete('/:dealershipId/logo', authMiddleware.validateAccessToken, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.deleteLogo)
router.post('/:dealershipId/verify', authMiddleware.validateAccessToken, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.verify)
router.post('/:dealershipId/unverify', authMiddleware.validateAccessToken, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.unverify)


export const dealershipRouter = router