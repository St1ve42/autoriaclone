import {DealershipRoleEnum} from "../enums/vehicleEnums/dealership.enum.ts";
import {BaseType} from "./BaseType.ts";

type DealershipMemberType = {
    _id: string
    dealership_id: string,
    user_id: string,
    role: DealershipRoleEnum,
    joinedAt: Date
} & BaseType

type DealershipMemberCreateDTOType = Pick<DealershipMemberType, "role">
type DealershipMemberAddDTOType = Pick<DealershipMemberType, "role"> & {email: string}
type DealershipMemberCreateWithUniqueFieldsDTOType = Pick<DealershipMemberType, "dealership_id" | "user_id" | "role">
type DealershipMemberUpdateDTOType = Pick<DealershipMemberType, "role">

export type {DealershipMemberType, DealershipMemberUpdateDTOType, DealershipMemberCreateDTOType, DealershipMemberAddDTOType, DealershipMemberCreateWithUniqueFieldsDTOType}