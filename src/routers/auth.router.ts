import {Router} from "express";
import {UserValidator} from "../vaildators/user.validator.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";
import {authController} from "../controllers/auth.controller.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";
import {AuthValidator} from "../vaildators/auth.validator.ts";

const router = Router()

router.post('/sign-up', commonMiddleware.validateBody(UserValidator.createUser), userMiddleware.checkEmailTaken, authController.signUp)
router.post('/sign-in', commonMiddleware.validateBody(UserValidator.signIn), authController.signIn)
router.post('/refresh', commonMiddleware.validateBody(AuthValidator.refreshToken), strictAuthMiddleware.validateRefreshToken, authController.refresh)
router.post('/log-out', strictAuthMiddleware.validateAccessToken, authController.logOut)
router.post('/log-out-all', strictAuthMiddleware.validateAccessToken, authController.logOutAll)
router.patch('/activate/:token', authController.activate)
router.post('/password/recovery', commonMiddleware.validateBody(UserValidator.recoveryRequest), userMiddleware.checkEmailExists, authController.recoveryRequest)
router.post('/password/recovery/:token', commonMiddleware.validateBody(UserValidator.recovery), authController.recovery)
router.post('/password/change', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateBody(UserValidator.change), authController.change)

export const authRouter = router