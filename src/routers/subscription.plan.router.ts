import {Router} from "express";
import {subscriptionPlanController} from "../controllers/subscription.plan.controller.ts";

const router = Router()

router.get('/', subscriptionPlanController.getList)

export const subscriptionPlanRouter = router