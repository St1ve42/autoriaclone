import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {DealershipValidator} from "../vaildators/dealership.validator.ts";
import {dealershipController} from "../controllers/dealership.controller.ts";
import {DealershipType} from "../types/DealershipType.ts";
import {dealerShipService} from "../services/dealership.service.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {dealershipLogoConfig} from "../constants/dealership.logo.constant.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";
import {DealershipReviewValidator} from "../vaildators/dealershipReview.validator.ts";
import {DealershipMemberValidator} from "../vaildators/dealership.member.validator.ts";
import {DealershipMemberType} from "../types/DealershipMemberType.ts";
import {dealershipMemberService} from "../services/dealership.member.service.ts";
import {DealershipMemberPermissionsEnum} from "../constants/dealership.member.role.permissions.ts";
import {dealershipMemberMiddleware} from "../middlewares/dealership.member.middleware.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";

const router = Router()

router.post('/', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateBody(DealershipValidator.createValidator), dealershipController.create)
router.get('/', dealershipController.getList)
router.get('/:dealershipId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.get)
router.patch('/:dealershipId', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateBody(DealershipValidator.updateValidator), dealershipController.update)
router.delete('/:dealershipId', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.DELETE_DEALERSHIP), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.delete)
router.post('/:dealershipId/logo', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), fileMiddleware.validateFile("logo", dealershipLogoConfig), dealershipController.uploadLogo)
router.delete('/:dealershipId/logo', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.deleteLogo)
router.post('/:dealershipId/verify', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateUserPermission("VERIFY_DEALERSHIP"), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.verify)
router.post('/:dealershipId/unverify', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateUserPermission("UNVERIFY_DEALERSHIP"), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.unverify)
router.post('/:dealershipId/reviews', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateBody(DealershipReviewValidator.validator), dealershipController.createReview)
router.get('/:dealershipId/reviews', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.getReviews)
router.get('/:dealershipId/announcements', commonMiddleware.validateQuery(QueryValidator.announcementValidator), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.getAnnouncements)
router.get('/:dealershipId/members', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.getMembers)
router.get('/:dealershipId/members/:memberId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Dealership member", "memberId"), dealershipMemberMiddleware.checkMemberBelongsToDealership, dealershipController.getMember)
router.post('/:dealershipId/members', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateBody(DealershipMemberValidator.create) ,dealershipController.addMember)
router.delete('/:dealershipId/members/:memberId', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Dealership member", "memberId"), dealershipMemberMiddleware.checkMemberBelongsToDealership, dealershipController.deleteMember)
router.patch('/:dealershipId/members/:memberId', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Dealership member", "memberId"), dealershipMemberMiddleware.checkMemberBelongsToDealership, commonMiddleware.validateBody(DealershipMemberValidator.update), dealershipController.updateMember)

export const dealershipRouter = router