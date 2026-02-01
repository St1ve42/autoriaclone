import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {DealershipValidator} from "../vaildators/dealership.validator.ts";
import {dealershipController} from "../controllers/dealership.controller.ts";
import {DealershipType} from "../types/DealershipType.ts";
import {dealerShipService} from "../services/dealership.service.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {dealershipLogoConfig} from "../constants/dealership.logo.constant.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";
import {DealershipReviewValidator} from "../vaildators/dealership.review.validator.ts";
import {DealershipMemberValidator} from "../vaildators/dealership.member.validator.ts";
import {DealershipMemberType} from "../types/DealershipMemberType.ts";
import {dealershipMemberService} from "../services/dealership.member.service.ts";
import {DealershipMemberPermissionsEnum} from "../constants/dealership.member.role.permissions.ts";
import {dealershipMemberMiddleware} from "../middlewares/dealership.member.middleware.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import { DealershipReviewType } from "../types/DealershipReviewType.ts";
import {dealershipReviewService} from "../services/dealership.review.service.ts";
import { dealershipReviewController } from "../controllers/dealership.review.controller.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";

const router = Router()

router.post('/', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(DealershipValidator.createValidator), dealershipController.create)
router.get('/', commonMiddleware.validateQuery(QueryValidator.dealershipValidator), dealershipController.getList)
router.get('/:dealershipId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.get)
router.patch('/:dealershipId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateBody(DealershipValidator.updateValidator), dealershipController.update)
router.delete('/:dealershipId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.DELETE_DEALERSHIP), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.delete)
router.post('/:dealershipId/logo', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), fileMiddleware.validateFile("logo", dealershipLogoConfig), dealershipController.uploadLogo)
router.delete('/:dealershipId/logo', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.deleteLogo)

router.post('/:dealershipId/reviews', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateBody(DealershipReviewValidator.createValidator), dealershipReviewController.create)
router.get('/:dealershipId/reviews', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateQuery(QueryValidator.dealershipReviewValidator), dealershipReviewController.getDealershipReviews)
router.get('/:dealershipId/reviews/:reviewId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateId("reviewId", "mongo"), commonMiddleware.validateEntityExisting<DealershipReviewType>(dealershipReviewService, "Відгук", "reviewId"), dealershipReviewController.get)
router.patch('/:dealershipId/reviews/:reviewId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateId("reviewId", "mongo"), commonMiddleware.validateEntityExisting<DealershipReviewType>(dealershipReviewService, "Відгук", "reviewId"), dealershipMemberMiddleware.checkReview, commonMiddleware.validateBody(DealershipReviewValidator.updateValidator), dealershipReviewController.update)
router.delete('/:dealershipId/reviews/:reviewId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateId("reviewId", "mongo"), commonMiddleware.validateEntityExisting<DealershipReviewType>(dealershipReviewService, "Відгук", "reviewId"), dealershipMemberMiddleware.checkReview, dealershipReviewController.delete)


router.get('/:dealershipId/members', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), dealershipController.getMembers)
router.get('/:dealershipId/members/:memberId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Працівник автосалона", "memberId"), dealershipController.getMember)
router.post('/:dealershipId/members', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateBody(DealershipMemberValidator.create) ,dealershipController.addMember)
router.delete('/:dealershipId/members/:memberId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Працівник автосалона", "memberId"), dealershipMemberMiddleware.checkMember, dealershipController.deleteMember)
router.patch('/:dealershipId/members/:memberId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Працівник автосалона", "memberId"), dealershipMemberMiddleware.checkMember, commonMiddleware.validateBody(DealershipMemberValidator.update), dealershipController.updateMember)

router.get('/:dealershipId/announcements', commonMiddleware.validateQuery(QueryValidator.announcementValidator), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.getAnnouncements)

export const dealershipRouter = router