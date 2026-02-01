import {UserOrderByEnum} from "../enums/userEnums/user.order.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {UserSearchByEnum} from "../enums/userEnums/user.search.by.enum.ts";
import {AnnouncementSearchByEnum} from "../enums/announcementEnums/announcement.search.by.enum.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";
import {AnnouncementRangeByEnum} from "../enums/announcementEnums/announcement.range.by.enum.ts";
import {DealershipSearchByEnum} from "../enums/dealershipEnums/dealership.searchBy.enum.ts";
import {DealershipOrderByEnum} from "../enums/dealershipEnums/dealership.orderBy.enum.ts";
import {DealershipReviewOrderByEnum} from "../enums/dealershipReviewsEnums/dealership.review.orderBy.enum.ts";
import {DealershipReviewSearchByEnum} from "../enums/dealershipReviewsEnums/dealership.review.searchBy.enum.ts";

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

type BaseQueryType = {
    page: number
    limit: number
    skip: number
}

type UserQueryType = QueryType<UserSearchByEnum, UserOrderByEnum>
type AnnouncementQueryType = QueryType<AnnouncementSearchByEnum, AnnouncementOrderByEnum>
type DealershipQueryType = QueryType<DealershipSearchByEnum, DealershipOrderByEnum>
type DealershipReviewQueryType = QueryType<DealershipReviewSearchByEnum, DealershipReviewOrderByEnum>
type DealershipMemberQueryType = QueryType<undefined, undefined>


export type {UserQueryType, BaseQueryType, AnnouncementQueryType, DealershipQueryType, DealershipReviewQueryType, DealershipMemberQueryType}