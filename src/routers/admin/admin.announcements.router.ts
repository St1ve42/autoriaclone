import {Router} from "express";
import {announcementController} from "../../controllers/announcement.controller.ts";
import {commonMiddleware} from "../../middlewares/common.middleware.ts";
import {QueryValidator} from "../../vaildators/query.validator.ts";
import {AnnouncementType} from "../../types/AnnouncementType.ts";
import {announcementService} from "../../services/announcement.service.ts";
import {AnnouncementPermissionsEnum} from "../../enums/permissionEnums/announcement.permissions.enum.ts";

const router = Router()

router.get('/', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.READ), commonMiddleware.validateQuery(QueryValidator.announcementValidator), announcementController.getListByAdmin)
router.get('/:announcementId', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.READ), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementController.getByAdmin)
router.post('/:announcementId/reset-approve-attempts', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.MODERATE), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"),announcementController.resetApproveAttempts)
router.post('/:announcementId/activate', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.MODERATE), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementController.activate)
router.post('/:announcementId/deactivate', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.MODERATE), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementController.deactivate)


export const adminAnnouncementsRouter = router