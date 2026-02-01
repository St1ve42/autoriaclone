import {Router} from "express";
import {userController} from "../controllers/user.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {UserValidator} from "../vaildators/user.validator.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {avatarConfig} from "../constants/avatar.constants.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";

const router = Router()

router.use(strictAuthMiddleware.validateAccessToken)

router.get('/me', userController.getMe)
router.patch('/me', commonMiddleware.validateBody(UserValidator.updateUser), userController.updateMe)
router.delete('/me', userController.deleteMe)
router.post('/me/avatar', fileMiddleware.validateFile('avatar', avatarConfig), userController.uploadAvatar)
router.delete('/me/avatar', userController.deleteAvatar)
router.get('/me/membership', userController.getMembership)
router.get('/me/announcements', commonMiddleware.validateQuery(QueryValidator.announcementValidator), userController.getAnnouncementList)
router.get('/me/subscription', userController.getSubscription)
router.get('/me/reviews', commonMiddleware.validateQuery(QueryValidator.dealershipReviewValidator), userController.getReviews)



export const userRouter = router