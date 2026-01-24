import {Router} from "express";
import {commonMiddleware} from "../../middlewares/common.middleware.ts";
import {BillingPermissionsEnum} from "../../enums/permissionEnums/billing.permissions.enum.ts";
import {SubscriptionPlanValidator} from "../../vaildators/subscription.plan.validator.ts";
import {subscriptionPlanController} from "../../controllers/subscription.plan.controller.ts";
import {SubscriptionPlan} from "../../../prisma/src/generated/prisma/client.ts";
import {subscriptionPlanService} from "../../services/subscription.plan.service.ts";

const router = Router()

router.use(commonMiddleware.validateUserPermission(BillingPermissionsEnum.MANAGE))

router.patch('/:subscriptionId', commonMiddleware.validateId('subscriptionId', "mysql"), commonMiddleware.validateEntityExisting<SubscriptionPlan>(subscriptionPlanService, "Subscription plan", "subscriptionId"), commonMiddleware.validateBody(SubscriptionPlanValidator.updateValidator), subscriptionPlanController.update)
router.post('/:subscriptionId/activate', commonMiddleware.validateId('subscriptionId', "mysql"), commonMiddleware.validateEntityExisting<SubscriptionPlan>(subscriptionPlanService, "Subscription plan", "subscriptionId"), subscriptionPlanController.activate)
router.post('/:subscriptionId/deactivate', commonMiddleware.validateId('subscriptionId', "mysql"), commonMiddleware.validateEntityExisting<SubscriptionPlan>(subscriptionPlanService, "Subscription plan", "subscriptionId"), subscriptionPlanController.deactivate)

export const adminSubscriptionsRouter = router
