import {UserOrderByEnum} from "../enums/userEnums/user.order.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {UserSearchByEnum} from "../enums/userEnums/user.search.by.enum.ts";
import {AnnouncementSearchByEnum} from "../enums/announcementEnums/announcement.search.by.enum.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";
import {AnnouncementRangeByEnum} from "../enums/announcementEnums/announcement.range.by.enum.ts";

export type QueryType<T,K> = {
    page: number
    limit: number
    skip: number
    search?: string
    searchBy?: T
    order: OrderEnum
    orderBy?: K,
    rangeBy?: AnnouncementRangeByEnum
    from?: number,
    to?: number
}

// export type QueryTypeVehicle<T extends string, K extends string> = {
//     page: number
//     limit: number
//     skip: number
//     search?: Record<T, string | number>
//     order: Record<K, OrderEnum>
//     range?: AnnouncementRangeByEnum
//     from?: number,
//     to?: number
// }

type BaseQuery = {
    page: number
    limit: number
    skip: number
}

type UserQueryType = QueryType<UserSearchByEnum, UserOrderByEnum>
type AnnouncementQueryType = QueryType<AnnouncementSearchByEnum, AnnouncementOrderByEnum>

export type {UserQueryType, BaseQuery, AnnouncementQueryType}