import {Router} from "express";
import {userRouter} from "./user.router.ts";
import {authRouter} from "./auth.router.ts";
import {announcementRouter} from "./announcement.router.ts";
import {subscriptionPlanRouter} from "./subscription.plan.router.ts";
import {regionRouter} from "./region.router.ts";
import {dealershipRouter} from "./dealership.router.ts";
import {adminRouter} from "./admin/admin.router.ts";
import {vehicleRouter} from "./vehicle.router.ts";

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/announcements', announcementRouter)
router.use('/subscribes', subscriptionPlanRouter)
router.use('/regions', regionRouter)
router.use('/dealerships', dealershipRouter)
router.use('/vehicles', vehicleRouter)
router.use('/admins', adminRouter)

export const apiRouter = router



