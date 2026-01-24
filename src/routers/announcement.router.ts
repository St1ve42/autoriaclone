import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.ts";
import {AnnouncementValidator} from "../vaildators/announcement.validator.ts";
import {AnnouncementType} from "../types/AnnouncementType.ts";
import {announcementService} from "../services/announcement.service.ts";
import {announcementController} from "../controllers/announcement.controller.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {announcementConfig} from "../constants/announcement.constant.ts"
import {ImageValidator} from "../vaildators/image.validator.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";
import {announcementMiddleware} from "../middlewares/announcement.middleware.ts";
import {optionalAuthMiddleware} from "../middlewares/optional.auth.middleware.ts";

const router = Router()

router.get('/', commonMiddleware.validateQuery(QueryValidator.announcementValidator), announcementController.getList)
router.post('/', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(AnnouncementValidator.createAnnouncement),announcementController.create)
router.get('/:announcementId', optionalAuthMiddleware.validateAccessToken, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementMiddleware.checkOptionalAccess, announcementController.get)
router.delete('/:announcementId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementMiddleware.checkStrictAccess, announcementController.delete)
router.patch('/:announcementId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementMiddleware.checkStrictAccess, commonMiddleware.validateBody(AnnouncementValidator.updateAnnouncement), announcementController.update)
router.post('/:announcementId/images', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementMiddleware.checkStrictAccess, fileMiddleware.validateManyFiles("images", announcementConfig), announcementController.upload)
router.post('/:announcementId/images/delete', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementMiddleware.checkStrictAccess, commonMiddleware.validateBody(ImageValidator.validator),announcementController.deleteImages)
router.get('/:announcementId/statistics', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, userMiddleware.checkPremiumAccount, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementMiddleware.checkStrictAccess, announcementController.getStatistics)
router.post('/:announcementId/statistics/view', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementMiddleware.checkAnnouncementIsActive, announcementController.increaseViews)


export const announcementRouter = router
