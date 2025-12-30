import {Router} from "express";
import {UserValidator} from "../vaildators/user.validator.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";
import {regionMiddleware} from "../middlewares/region.middleware.ts";
import {authController} from "../controllers/auth.controller.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {AuthValidator} from "../vaildators/auth.validator.ts";

const router = Router()

router.post('/sign-up', commonMiddleware.validateBody(UserValidator.createUser), userMiddleware.checkEmailTaken, regionMiddleware.validateRegion, authController.signUp)
router.post('/sign-in', commonMiddleware.validateBody(UserValidator.signIn), authController.signIn)
router.post('/refresh', commonMiddleware.validateBody(AuthValidator.refreshToken), authMiddleware.validateRefreshToken, authController.refresh)
router.post('/log-out', authMiddleware.validateAccessToken, authController.logOut)
router.post('/log-out-all', authMiddleware.validateAccessToken, authController.logOutAll)
router.patch('/activate/:token', authController.activate)
router.post('/password/recovery', commonMiddleware.validateBody(UserValidator.recoveryRequest), userMiddleware.checkEmailExists, authController.recoveryRequest)
router.post('/password/recovery/:token', commonMiddleware.validateBody(UserValidator.recovery), authController.recovery)
router.post('/password/change', authMiddleware.validateAccessToken, commonMiddleware.validateBody(UserValidator.change), authController.change)

export const authRouter = router