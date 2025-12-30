import {Router} from "express";
import {userController} from "../controllers/user.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {UserValidator} from "../vaildators/user.validator.ts";
import {regionMiddleware} from "../middlewares/region.middleware.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import {roleMiddleware} from "../middlewares/role.middleware.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {avatarConfig} from "../constants/avatar.constants.ts";
import {BanValidator} from "../vaildators/ban.validator.ts";
import {User} from "../../prisma/src/generated/prisma/client.ts";
import {userService} from "../services/user.service.ts";
import {SubscribeValidator} from "../vaildators/subscribe.validator.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";

const router = Router()

router.get('/', commonMiddleware.validatePermission("VIEW_ALL_USERS"), userMiddleware.checkUserIsBanned, commonMiddleware.validateQuery(QueryValidator.userValidator), userController.getAll)
router.post('/', commonMiddleware.validatePermission("CREATE_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(UserValidator.createUser), regionMiddleware.validateRegion, userController.create)
router.post('/me/avatar', fileMiddleware.validateFile('avatar', avatarConfig), userController.uploadAvatar)
router.delete('/me/avatar', userController.deleteAvatar)
router.get('/me', authMiddleware.validateAccessToken, userController.getMe)
router.put('/me', authMiddleware.validateAccessToken, commonMiddleware.validateBody(UserValidator.updateUser), userController.updateMe)
router.delete('/me', authMiddleware.validateAccessToken, userController.deleteMe)
router.post('/me/subscribe/buy', userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(SubscribeValidator.validator), userController.buySubscribe)
router.get('/:userId', commonMiddleware.validatePermission("VIEW_ALL_USERS"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.get)
router.delete('/:userId', commonMiddleware.validatePermission("DELETE_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.delete)
router.patch('/:userId', commonMiddleware.validatePermission("UPDATE_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), commonMiddleware.validateBody(UserValidator.updateUser), regionMiddleware.validateRegion, roleMiddleware.validateRole, userController.update)
router.post('/:userId/ban', commonMiddleware.validatePermission("BAN_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), commonMiddleware.validateBody(BanValidator.validator), userController.ban)
router.post('/:userId/unban', commonMiddleware.validatePermission("UNBAN_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.unban)
router.post('/:userId/activate', commonMiddleware.validatePermission("UPDATE_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.activate)
router.post('/:userId/deactivate', commonMiddleware.validatePermission("UPDATE_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.deactivate)
router.post('/:userId/manager', commonMiddleware.validatePermission("UPDATE_USER"), userMiddleware.checkUserIsBanned, commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.setManager)


export const userRouter = router