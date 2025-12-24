import {prisma} from "../../prisma/prisma.client.ts";
import {AnnouncementViewsDay} from "../../prisma/src/generated/prisma/client.ts";
import {TimeHelper} from "../timeHelper/time.helper.ts";

class AnnouncementViewsDayRepository{

    public async sumViewsByWeek(id: string){
        return await prisma.announcementViewsDay.aggregate({
            _sum: {
                views: true
            },
            where: {
                announcement_id: id, view_date: {lte: TimeHelper.toDateNowOnlyUTC(), gte: TimeHelper.toDateOnlyUTC(TimeHelper.subTime(1, "w"))}
            }
        })
    }

    public async sumViewsByMonth(id: string){
        return await prisma.announcementViewsDay.aggregate({
            _sum: {
                views: true
            },
            where: {
                announcement_id: id, view_date: {lte: TimeHelper.toDateNowOnlyUTC(), gte: TimeHelper.toDateOnlyUTC(TimeHelper.subTime(1, "month"))}
            }
        })
    }

    public async getById(id: string): Promise<AnnouncementViewsDay | null>{
        return await prisma.announcementViewsDay.findUnique({where: {announcement_id_view_date: {announcement_id: id, view_date: TimeHelper.toDateNowOnlyUTC()}}})
    }

    public async create(id: string): Promise<AnnouncementViewsDay>{
        return await prisma.announcementViewsDay.create({data: {announcement_id: id, view_date: TimeHelper.toDateNowOnlyUTC()}})
    }

    public async increaseViewCount(id: string): Promise<AnnouncementViewsDay>{
        const viewDate = TimeHelper.toDateNowOnlyUTC()
        return await prisma.announcementViewsDay.upsert({
            where: {announcement_id_view_date: {announcement_id: id, view_date: viewDate}},
            update: {views: {increment: 1}},
            create: {announcement_id: id, view_date: viewDate, views: 1}
        })
    }

}

export const announcementViewsDayRepository = new AnnouncementViewsDayRepository();