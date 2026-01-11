import {Router} from "express";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";
import {subscribeController} from "../controllers/subscribe.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {SubscribeValidator} from "../vaildators/subscribe.validator.ts";

const router = Router()

router.patch('/by-code/price', commonMiddleware.validateBody(SubscribeValidator.priceValidator), subscribeController.setPrice)
router.patch('/by-code/duration', commonMiddleware.validateBody(SubscribeValidator.durationValidator), subscribeController.setDuration)
router.patch('/by-code/activate', commonMiddleware.validateBody(SubscribeValidator.validator), subscribeController.activate)
router.patch('/by-code/deactivate', commonMiddleware.validateBody(SubscribeValidator.validator), subscribeController.deactivate)


export const subscribeRouter = router