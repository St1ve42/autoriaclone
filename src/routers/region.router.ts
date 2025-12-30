import {Router} from "express";
import {regionController} from "../controllers/region.controller.ts";

const router = Router()

router.get('/', regionController.getList)

export const regionRouter = router