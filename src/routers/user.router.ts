import {Router} from "express";
import {userController} from "../controllers/user.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {UserValidator} from "../vaildators/user.validator.ts";
import {regionMiddleware} from "../middlewares/region.middleware.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import {roleMiddleware} from "../middlewares/role.middleware.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {avatarConfig} from "../constants/avatar.constants.ts";
import {BanValidator} from "../vaildators/ban.validator.ts";
import {User} from "../../prisma/src/generated/prisma/client.ts";
import {userService} from "../services/user.service.ts";

const router = Router()

router.patch('/ban/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("BAN_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateBody(BanValidator.validator), userController.ban)
router.patch('/unban/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("UNBAN_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateBody(BanValidator.validator), userController.unban)
router.post('/me/avatar', authMiddleware.validateAccessToken, fileMiddleware.validateFile('avatar', avatarConfig), userController.uploadAvatar)
router.delete('/me/avatar', authMiddleware.validateAccessToken, userController.deleteAvatar)
router.patch('/activate/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), userController.activate)
router.patch('/deactivate/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), userController.deactivate)
router.patch('/set-manager/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), userController.setManager)
router.get('/', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("VIEW_ALL_USERS"), commonMiddleware.validateQuery(QueryValidator.userValidator), userController.getAll)
router.get('/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("VIEW_ALL_USERS"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.get)
router.post('/', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("CREATE_USER"),commonMiddleware.validateBody(UserValidator.createUser), regionMiddleware.validateRegion, userController.create)
router.delete('/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("DELETE_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), userController.delete)
router.patch('/:userId', authMiddleware.validateAccessToken, commonMiddleware.validatePermission("UPDATE_USER"), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "User", "userId"), commonMiddleware.validateBody(UserValidator.updateUser), regionMiddleware.validateRegion, roleMiddleware.validateRole, userController.update)


export const userRouter = router