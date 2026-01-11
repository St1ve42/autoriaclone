import {AnnouncementType} from "./AnnouncementType.ts";
import {VehicleType} from "./VehicleType.ts";
import {UserWithIncludedRegionAndRoleType} from "./UserWithIncludeDataType.ts";

type ListReturnType<T> = [T[], number]

type UserListReturnType = ListReturnType<UserWithIncludedRegionAndRoleType>
type AnnouncementListReturnType = ListReturnType<AnnouncementType>
type VehicleListReturnType = ListReturnType<VehicleType>

export type {UserListReturnType, AnnouncementListReturnType, VehicleListReturnType}