import {Router} from "express";
import {userController} from "../controllers/user.controller.ts";

const router = Router()

router.get('/', userController.getUsers)

export const userRouter = router