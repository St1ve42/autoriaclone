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

const router = Router()

router.get('/', commonMiddleware.validatePermission("VIEW_ALL_USERS"), commonMiddleware.validateQuery(QueryValidator.userValidator), userController.getAll)
router.post('/', commonMiddleware.validatePermission("CREATE_USER"),commonMiddleware.validateBody(UserValidator.createUser), regionMiddleware.validateRegion, userController.create)
router.post('/me/avatar', fileMiddleware.validateFile('avatar', avatarConfig), userController.uploadAvatar)
router.delete('/me/avatar', userController.deleteAvatar)
router.post('/me/subscribe/buy', commonMiddleware.validateBody(SubscribeValidator.validator), userController.buySubscribe)
router.get('/:userId', commonMiddleware.validatePermission("VIEW_ALL_USERS"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.get)
router.delete('/:userId', commonMiddleware.validatePermission("DELETE_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.delete)
router.patch('/:userId', commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), commonMiddleware.validateBody(UserValidator.updateUser), regionMiddleware.validateRegion, roleMiddleware.validateRole, userController.update)
router.patch('/:userId/ban', commonMiddleware.validatePermission("BAN_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), commonMiddleware.validateBody(BanValidator.validator), userController.ban)
router.patch('/:userId/unban', commonMiddleware.validatePermission("UNBAN_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), commonMiddleware.validateBody(BanValidator.validator), userController.unban)
router.patch('/:userId/activate', commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.activate)
router.patch('/:userId/deactivate', commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.deactivate)
router.patch('/:userId/manager', commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.setManager)


export const userRouter = router