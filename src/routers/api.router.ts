import {Router} from "express";
import {userRouter} from "./user.router.ts";
import {authRouter} from "./auth.router.ts";
import {announcementRouter} from "./announcement.router.ts";
import {subscribeRouter} from "./subscribe.router.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {regionRouter} from "./region.router.ts";
import {dealershipRouter} from "./dealership.router.ts";
import {adminRouter} from "./admin/admin.router.ts";

const router = Router()

router.use('/users', strictAuthMiddleware.validateAccessToken, userRouter)
router.use('/auth', authRouter)
router.use('/announcements', announcementRouter)
router.use('/subscribes', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateUserPermission("UPDATE_SUBSCRIBE_INFO"), subscribeRouter)
router.use('/regions', regionRouter)
router.use('/dealerships', dealershipRouter)
router.use('/admins', adminRouter)

export const apiRouter = router



