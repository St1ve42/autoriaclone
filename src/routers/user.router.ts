import {Router} from "express";
import {userController} from "../controllers/user.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {UserValidator} from "../vaildators/user.validator.ts";
import {regionMiddleware} from "../middlewares/region.middleware.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";

const router = Router()

router.get('/', userController.getUsers)
router.get('/:userId', commonMiddleware.validateId("userId", "mysql"), userMiddleware.checkUserExists, userController.getUser)
router.post('/', commonMiddleware.validateBody(UserValidator.createUser), regionMiddleware.validateRegion, userController.createUser)
router.delete('/:userId', commonMiddleware.validateId("userId", "mysql"), userMiddleware.checkUserExists, userController.deleteUser)
router.patch('/:userId', commonMiddleware.validateId("userId", "mysql"), userMiddleware.checkUserExists, commonMiddleware.validateBody(UserValidator.updateUser), regionMiddleware.validateRegion, userController.updateUser)

export const userRouter = router