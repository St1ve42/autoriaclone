import {DealershipRoleEnum} from "../enums/vehicleEnums/dealership.enum.ts";
import {BaseType} from "./BaseType.ts";

export type DealershipMemberType = {
    _id: string
    dealership_id: string,
    user_id: string,
    role: DealershipRoleEnum,
    joinedAt: Date
} & BaseType