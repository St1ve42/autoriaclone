import {Request, Response, NextFunction} from "express";
import {TokenPayloadType} from "../types/TokenType.ts";
import {announcementService} from "../services/announcement.service.ts";
import {AdminRoleEnums} from "../enums/adminEnums/admin.role.enums.ts";
import {userService} from "../services/user.service.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {AnnouncementStatusEnum} from "../enums/announcementEnums/announcement.status.enum.ts";
import {AnnouncementType} from "../types/AnnouncementType.ts";

class AnnouncementMiddleware{
    public async checkStrictAccess (req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId
            const {user_id} = res.locals.payload as TokenPayloadType
            const announcement = await announcementService.get(announcementId)
            const hasAccess = await AnnouncementMiddleware.hasAccess(user_id, announcement)
            if(!hasAccess){
                throw new ApiError("Користувач не має право здійснювати поточну операцію", StatusCodeEnum.FORBIDDEN)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

    public async checkAnnouncementIsActive (req: Request, res: Response, next: NextFunction){
        try{
            const announcementId = req.params.announcementId
            const announcement = await announcementService.get(announcementId)
            if(announcement.status !== AnnouncementStatusEnum.ACTIVE){
                throw new ApiError("Оголошення не знайдено", StatusCodeEnum.NOT_FOUND)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

    public async checkOptionalAccess(req: Request, res: Response, next: NextFunction){
        try{
            let hasAccess = false
            const announcementId = req.params.announcementId
            const announcement = await announcementService.get(announcementId)
            const payload = res.locals.payload as TokenPayloadType | null
            if(payload){
                const {user_id} = res.locals.payload as TokenPayloadType
                hasAccess = await AnnouncementMiddleware.hasAccess(user_id, announcement)
                if(!hasAccess && announcement.status !== AnnouncementStatusEnum.ACTIVE){
                    throw new ApiError("Оголошення не знайдено", StatusCodeEnum.NOT_FOUND)
                }
            }
            else if(!payload && announcement.status !== AnnouncementStatusEnum.ACTIVE){
                throw new ApiError("Оголошення не знайдено", StatusCodeEnum.NOT_FOUND)
            }
            res.locals.hasAccess = hasAccess
            next()
        }
        catch(e){
            next(e)
        }
    }



    private static async hasAccess (user_id: string, announcement: AnnouncementType): Promise<boolean>{
        const user = await userService.get(user_id)
        const isOwner = announcement.user_id === user_id
        const isAdmin = Object.values(AdminRoleEnums).some(roleName => user.Role.name === roleName)
        return isOwner || isAdmin
    }

}

export const announcementMiddleware = new AnnouncementMiddleware()