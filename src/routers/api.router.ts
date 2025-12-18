import {Router} from "express";
import {userRouter} from "./user.router.ts";
import {authRouter} from "./auth.router.ts";
import {vehicleRouter} from "./vehicle.router.ts";
import {announcementRouter} from "./announcement.router.ts";

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/vehicles', vehicleRouter)
router.use('/announcements', announcementRouter)

export const apiRouter = router



