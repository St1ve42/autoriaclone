import {Router} from "express";
import {adminUsersRouter} from "./admin.users.router.ts";
import {adminDealershipsRouter} from "./admin.dealerships.router.ts";
import {strictAuthMiddleware} from "../../middlewares/strict.auth.middleware.ts";
import {adminMiddleware} from "../../middlewares/admin.middleware.ts";
import {userMiddleware} from "../../middlewares/user.middleware.ts";
import {adminAnnouncementsRouter} from "./admin.announcements.router.ts";
import {adminSubscriptionsRouter} from "./admin.subscriptions.router.ts";
import {adminRolesRouter} from "./admin.roles.router.ts";

const router = Router()


router.use(strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, adminMiddleware.checkAccess)
router.use('/users', adminUsersRouter)
router.use('/dealerships', adminDealershipsRouter)
router.use('/announcements', adminAnnouncementsRouter)
router.use('/subscriptions', adminSubscriptionsRouter)
router.use('/roles', adminRolesRouter)

export const adminRouter = router