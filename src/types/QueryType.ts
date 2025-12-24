import {UserOrderByEnum} from "../enums/userEnums/user.order.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {VehicleSearchByEnum} from "../enums/vehicleEnums/vehicle.search.by.enum.ts"
import {UserSearchByEnum} from "../enums/userEnums/user.search.by.enum.ts";
import {VehicleOrderByEnum} from "../enums/vehicleEnums/vehicle.order.by.enum.ts";
import {AnnouncementSearchByEnum} from "../enums/announcementEnums/announcement.search.by.enum.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";

export type QueryType<T,K> = {
    page: number
    limit: number
    skip: number
    search?: string
    search_by?: T
    order: OrderEnum
    order_by?: K
}

type UserQueryType = QueryType<UserSearchByEnum, UserOrderByEnum>
type VehicleQueryType = QueryType<VehicleSearchByEnum, VehicleOrderByEnum>
type AnnouncementQueryType = QueryType<AnnouncementSearchByEnum, AnnouncementOrderByEnum>

export type {UserQueryType, VehicleQueryType, AnnouncementQueryType}