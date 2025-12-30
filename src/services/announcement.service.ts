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

class AnnouncementService{
    public async getList(query: AnnouncementQueryType): Promise<AnnouncementListReturnType>{
        return await announcementRepository.getList(query)
    }

    public async get(id: string){
        return await announcementRepository.get(id) as AnnouncementType
    }

    public async create(dto: CreateAnnouncementDTOType, userId: string){
        const {account_type} = await userService.get(userId)
        const announcements = await announcementRepository.findByParams({user_id: userId})
        if(account_type === 'basic' && announcements.length !== 0 && announcements.length >= 1){
            throw new ApiError("User with basic account can create only one announcement", StatusCodeEnum.FORBIDDEN)
        }
        let approve_attempts = 0
        const isObsceneLanguage = Utils.isObsceneLanguage(dto.description)
        if(isObsceneLanguage){
            approve_attempts += 1
        }
        const status = announcementService.getStatus(approve_attempts)
        const exchangeRate = await PrivatBank.getExchangeRate()
        const data: CreateAnnouncementInRepositoryDTOType = {...dto, exchange_rate: exchangeRate, user_id: userId, status, approve_attempts}
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
                dto.status = announcementService.getStatus(dto.approve_attempts)
                delete dto.description
            }
            else{
                dto.status = AnnouncementStatusEnum.ACTIVE
            }
        }
        return await announcementRepository.update(id, dto) as AnnouncementType //TODO status according to approve_attempts?
    }

    public async upload(id: string, images: UploadedFile[]){
        const {images: announcementImages} = await announcementService.get(id)
        if(announcementImages.length !== 0){
            await Promise.all(announcementImages.map(async (image) => await s3Service.deleteFile(image)))
        }
        const paths = await Promise.all(images.map(async (image) => await s3Service.uploadFile(FileItemTypeEnum.ANNOUNCEMENT, id, image)))
        return await announcementService.update(id, {images: paths})
    }

    public async deleteImages(id: string, imageNames: string[]){
        const imagePaths = imageNames.map(imageName => `announcement/${id}/${imageName}`)
        const {images: announcementImages} = await announcementService.get(id)
        if(announcementImages.length === 0){
            throw new ApiError("Announcement doesn't contain images", StatusCodeEnum.NOT_FOUND)
        }
        imagePaths.forEach(imagePath => {
            if(!announcementImages.includes(imagePath)){
                throw new ApiError(`Image ${imagePath.split('/').at(-1)} not found`, StatusCodeEnum.NOT_FOUND)
            }
        })
        await Promise.all(imagePaths.map(async (fullPath) => await s3Service.deleteFile(fullPath)))
        return await announcementService.update(id, {images: announcementImages.filter(announcementImage => !imagePaths.includes(announcementImage))})
    }

    public getStatus(approve_attempts: number): string{
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
