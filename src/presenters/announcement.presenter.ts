import {AnnouncementType} from "../types/AnnouncementType.ts";
import {AnnouncementQueryType} from "../types/QueryType.ts";
import {userService} from "../services/user.service.ts";
import {userPresenter} from "./user.presenter.ts";
import {regionService} from "../services/region.service.ts";
import {dealershipPresenter} from "./dealership.presenter.ts";
import {dealerShipService} from "../services/dealership.service.ts";

class AnnouncementPresenter{
    public async list(
        announcements: AnnouncementType[],
        total: number,
        query: AnnouncementQueryType
    ) {
        const data = await Promise.all(announcements.map(async (announcement) => {
            const presenter = await this.res(announcement)
            if(!presenter){
                total -= 1
            }
            return presenter
        }))
        return {
            data,
            total,
            ...query
        }
    }

    public async res(announcement: AnnouncementType){
        const user = await userService.get(announcement.user_id)
        if (user.is_banned || user.is_deleted || !user.is_active){
            return
        }
        const region = await regionService.getNameById(announcement.region)
        return {
            id: announcement._id,
            title: announcement.title,
            description: announcement.description,
            city: announcement.city,
            region: region,
            images: announcement.images,
            price: announcement.price,
            currency: announcement.currency,
            exchange_rate: announcement.exchange_rate,
            rate_source: announcement.rate_source,
            rate_date: announcement.rate_date,
            vehicle: announcement.vehicle,
            user: await userPresenter.publicRes(user),
            dealership: announcement.dealership && await dealershipPresenter.res(announcement.dealership)
        }
    }

    public async userRes(announcement: AnnouncementType){
        const region = await regionService.getNameById(announcement.region)
        return {
            id: announcement._id,
            title: announcement.title,
            description: announcement.description,
            city: announcement.city,
            region: region,
            images: announcement.images,
            price: announcement.price,
            currency: announcement.currency,
            exchange_rate: announcement.exchange_rate,
            rate_source: announcement.rate_source,
            rate_date: announcement.rate_date,
            approve_attempts: announcement.approve_attempts,
            status: announcement.status,
            vehicle: announcement.vehicle,
            dealership: announcement.dealership && await dealershipPresenter.res(announcement.dealership)
        }
    }

    public async adminRes(announcement: AnnouncementType){
        const user = await userService.get(announcement.user_id)
        const region = await regionService.getNameById(announcement.region)
        return {
            id: announcement._id,
            title: announcement.title,
            description: announcement.description,
            city: announcement.city,
            region: region,
            images: announcement.images,
            price: announcement.price,
            currency: announcement.currency,
            exchange_rate: announcement.exchange_rate,
            rate_source: announcement.rate_source,
            rate_date: announcement.rate_date,
            approve_attempts: announcement.approve_attempts,
            status: announcement.status,
            user: await userPresenter.publicRes(user),
            vehicle: announcement.vehicle,
            dealership: announcement.dealership && await dealershipPresenter.res(announcement.dealership),
            created_at: announcement.createdAt,
            updated_at: announcement.updatedAt,
        }
    }

    public async userList(
        announcements: AnnouncementType[],
        total: number,
        query: AnnouncementQueryType
    ) {
        return {
            data: await Promise.all(announcements.map(this.userRes)),
            total,
            ...query
        }
    }

    public async adminList(
        announcements: AnnouncementType[],
        total: number,
        query: AnnouncementQueryType
    ) {
        return {
            data: await Promise.all(announcements.map(this.adminRes)),
            total,
            ...query
        }
    }

}

export const announcementPresenter = new AnnouncementPresenter();