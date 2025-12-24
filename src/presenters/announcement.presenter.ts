import {AnnouncementType} from "../types/AnnouncementType.ts";
import {AnnouncementQueryType} from "../types/QueryType.ts";

class AnnouncementPresenter{
    public list(
        announcements: AnnouncementType[],
        total: number,
        query: AnnouncementQueryType
    ) {
        return {
            data: announcements.map(this.res),
            total,
            ...query
        }
    }

    public res(announcement: AnnouncementType){
        return {
            id: announcement._id,
            title: announcement.title,
            description: announcement.description,
            city: announcement.city,
            region: announcement.region,
            images: announcement.images,
            price: announcement.price,
            currency: announcement.currency,
            exchange_rate: announcement.exchange_rate,
            rate_source: announcement.rate_source,
            rate_date: announcement.rate_date,
            approve_attempts: announcement.approve_attempts,
            status: announcement.status,
            vehicle: announcement.vehicle,
            user_id: announcement.user_id,
            dealershipId: announcement.dealershipId
        }
    }

}

export const announcementPresenter = new AnnouncementPresenter();