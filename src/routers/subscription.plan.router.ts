import {Router} from "express";
import {subscriptionPlanController} from "../controllers/subscription.plan.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {SubscriptionPlan} from "../../prisma/src/generated/prisma/client.ts";
import {subscriptionPlanService} from "../services/subscription.plan.service.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";

const router = Router()

router.get('/', subscriptionPlanController.getList)
router.get('/:planId', subscriptionPlanController.get)
router.post('/:planId/purchase', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateId("planId", "mysql"), commonMiddleware.validateEntityExisting<SubscriptionPlan>(subscriptionPlanService, "SubscriptionPlan", "planId"), subscriptionPlanController.purchase)

export const subscriptionPlanRouter = router