import {AnnouncementType} from "../types/AnnouncementType.ts";
import {AnnouncementQueryType} from "../types/QueryType.ts";
import {userService} from "../services/user.service.ts";
import {userPresenter} from "./user.presenter.ts";
import {regionService} from "../services/region.service.ts";

class AnnouncementPresenter{
    public async list(
        announcements: AnnouncementType[],
        total: number,
        query: AnnouncementQueryType
    ) {
        return {
            data: await Promise.all(announcements.map(this.res)),
            total,
            ...query
        }
    }

    public async res(announcement: AnnouncementType){
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
            vehicle: announcement.vehicle,
            user: await userPresenter.toAnnouncementRes(user),
            dealershipId: announcement.dealershipId
        }
    }

}

export const announcementPresenter = new AnnouncementPresenter();