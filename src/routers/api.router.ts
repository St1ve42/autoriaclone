import {Router} from "express";
import {userRouter} from "./user.router.ts";
import {authRouter} from "./auth.router.ts";
import {vehicleRouter} from "./vehicle.router.ts";
import {announcementRouter} from "./announcement.router.ts";
import {subscribeRouter} from "./subscribe.router.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {regionRouter} from "./region.router.ts";
import {dealershipRouter} from "./dealership.router.ts";

const router = Router()

router.use('/users', authMiddleware.validateAccessToken, userRouter)
router.use('/auth', authRouter)
router.use('/vehicles', vehicleRouter)
router.use('/announcements', announcementRouter)
router.use('/subscribes', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("UPDATE_SUBSCRIBE_INFO"), subscribeRouter)
router.use('/regions', regionRouter)
router.use('/dealerships', dealershipRouter)

export const apiRouter = router



