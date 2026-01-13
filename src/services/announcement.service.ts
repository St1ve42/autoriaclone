import {AnnouncementType, CreateAnnouncementDTOType, CreateAnnouncementInRepositoryDTOType, UpdateAnnouncementDTOType} from "../types/AnnouncementType.ts";
import {announcementRepository} from "../repository/announcement.repository.ts";
import {PrivatBank} from "../publicAPI/PrivatBank.ts";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service.ts";
import {FileItemTypeEnum} from "../enums/generalEnums/FileEnum.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {userService} from "./user.service.ts";
import {AnnouncementQueryType} from "../types/QueryType.ts";
import {Utils} from "../utils/utils.ts";
import {AnnouncementStatusEnum} from "../enums/announcementEnums/announcement.status.enum.ts";
import {AnnouncementListReturnType} from "../types/ListReturnType.ts";
import {announcementStatisticsService} from "./announcement.statistics.service.ts";
import {dealershipMemberRepository} from "../repository/dealership.member.repository.ts";
import {AccountTypeEnum} from "../../prisma/src/generated/prisma/enums.ts";

class AnnouncementService{
    public async getList(query: AnnouncementQueryType, filterInput?: Partial<AnnouncementType> & {dealership_id?: string}): Promise<AnnouncementListReturnType>{
        return await announcementRepository.getList(query, filterInput)
    }

    public async get(id: string){
        return await announcementRepository.get(id) as AnnouncementType
    }

    public async create(dto: CreateAnnouncementDTOType, userId: string){
        const {account_type} = await userService.get(userId)
        const announcements = await announcementRepository.findByParams({user_id: userId})
        if(account_type === AccountTypeEnum.basic && announcements.length !== 0 && announcements.length >= 1){
            throw new ApiError("User with basic account can create only one announcement", StatusCodeEnum.FORBIDDEN)
        }
        let approve_attempts = 0
        const isObsceneLanguage = Utils.isObsceneLanguage(dto.description)
        if(isObsceneLanguage){
            approve_attempts += 1
        }
        const status = AnnouncementService.getStatus(approve_attempts)
        const exchangeRate = await PrivatBank.getExchangeRate()
        let data: CreateAnnouncementInRepositoryDTOType = {...dto, exchange_rate: exchangeRate, user_id: userId, status, approve_attempts}
        const member = await dealershipMemberRepository.findOneByParams({user_id: userId})
        if(member){
            data.dealership_id = member.dealership_id
        }
        const announcement = await announcementRepository.create(data)
        if(status === AnnouncementStatusEnum.ACTIVE){
            await announcementStatisticsService.create(announcement._id)
        }
        return announcement
    }

    public async delete(id: string){
        return await announcementRepository.delete(id) as AnnouncementType
    }

    public async update(id: string, dto: UpdateAnnouncementDTOType){
        if(dto.description){
            const isObsceneLanguage = Utils.isObsceneLanguage(dto.description)
            if(isObsceneLanguage){
                const {approve_attempts} = await announcementService.get(id)
                dto.approve_attempts = approve_attempts + 1
                dto.status = AnnouncementService.getStatus(dto.approve_attempts)
                delete dto.description
            }
            else{
                dto.status = AnnouncementStatusEnum.ACTIVE
            }
        }
        return await announcementRepository.update(id, dto) as AnnouncementType
    }

    public async upload(id: string, uploadedImages: UploadedFile[]){
        const {images: announcementImages} = await announcementService.get(id)
        if(announcementImages.length + uploadedImages.length > 10){
            throw new ApiError("Announcements can not contain more than 10 images", StatusCodeEnum.CONFLICT)
        }
        const paths = await s3Service.uploadManyFiles(FileItemTypeEnum.ANNOUNCEMENT, id, uploadedImages)
        return await announcementRepository.updateImages(id, paths, "upload") as AnnouncementType
    }

    public async deleteImages(id: string, imagePaths: string[]){
        const {images: announcementImages} = await announcementService.get(id)
        if(announcementImages.length === 0){
            throw new ApiError("Announcement doesn't contain images", StatusCodeEnum.NOT_FOUND)
        }
        imagePaths.forEach(imagePath => {
            if(!announcementImages.includes(imagePath)){
                throw new ApiError(`Image ${imagePath.split('/').at(-1)} not found`, StatusCodeEnum.NOT_FOUND)
            }
        })
        await s3Service.deleteManyFiles(imagePaths)
        return await announcementRepository.updateImages(id, imagePaths, "delete") as AnnouncementType
    }

    public async activate (id: string){
        return await announcementRepository.update(id, {status: AnnouncementStatusEnum.ACTIVE})
    }

    public async deactivate (id: string){
        return await announcementRepository.update(id, {status: AnnouncementStatusEnum.INACTIVE})
    }

    public async resetApproveAttempts (id: string){
        return await announcementRepository.update(id, {approve_attempts: 0})
    }

    private static getStatus(approve_attempts: number): string{
        let status: AnnouncementStatusEnum | '' = ''
        if(approve_attempts === 0){
            status = AnnouncementStatusEnum.ACTIVE
        }
        else if(approve_attempts === 1 || approve_attempts === 2){
            status = AnnouncementStatusEnum.PENDING
        }
        else{
            status = AnnouncementStatusEnum.INACTIVE
        }
        return status
    }

}

export const announcementService = new AnnouncementService()

//TODO think about creating db about reported cars
