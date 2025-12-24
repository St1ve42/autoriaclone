import {User} from "../../prisma/src/generated/prisma/client.ts";
import {AnnouncementType} from "./AnnouncementType.ts";
import {VehicleType} from "./VehicleType.ts";

type ListReturnType<T> = [T[], number]

type UserListReturnType = ListReturnType<User>
type AnnouncementListReturnType = ListReturnType<AnnouncementType>
type VehicleListReturnType = ListReturnType<VehicleType>

export type {UserListReturnType, AnnouncementListReturnType, VehicleListReturnType}