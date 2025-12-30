import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {AnnouncementValidator} from "../vaildators/announcement.validator.ts";
import {AnnouncementType} from "../types/AnnouncementType.ts";
import {announcementService} from "../services/announcement.service.ts";
import {announcementController} from "../controllers/announcement.controller.ts";
import {fileMiddleware} from "../middlewares/file.middleware.ts";
import {announcementConfig} from "../constants/announcement.constant.ts"
import {ImageValidator} from "../vaildators/image.validator.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";
import {userMiddleware} from "../middlewares/user.middleware.ts";

const router = Router()

router.get('/', commonMiddleware.validateQuery(QueryValidator.announcementValidator), announcementController.getList)
router.post('/', authMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validatePermission("CREATE_ANNOUNCEMENT"), commonMiddleware.validateBody(AnnouncementValidator.createAnnouncement),announcementController.create)
router.get('/:announcementId', commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementController.get)
router.delete('/:announcementId', authMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validatePermission("DELETE_ANNOUNCEMENT"), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementController.delete)
router.patch('/:announcementId', authMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validatePermission("UPDATE_ANNOUNCEMENT"), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), commonMiddleware.validateBody(AnnouncementValidator.updateAnnouncement), announcementController.update)
router.post('/:announcementId/images', authMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validatePermission("CREATE_ANNOUNCEMENT"), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), fileMiddleware.validateManyFiles("images", announcementConfig), announcementController.upload)
router.post('/:announcementId/images/delete', authMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validatePermission("UPDATE_ANNOUNCEMENT"), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), commonMiddleware.validateBody(ImageValidator.validator),announcementController.deleteImages)
router.get('/:announcementId/statistics', authMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, userMiddleware.checkPremiumAccount, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementController.getStatistics)
router.post('/:announcementId/statistics/view', authMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Announcement", "announcementId"), announcementController.increaseViews)


export const announcementRouter = router
