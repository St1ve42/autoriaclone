import {DealershipRoleEnum} from "../enums/vehicleEnums/dealership.enum.ts";

export enum DealershipMemberPermissionsEnum {
    UPDATE_INFO = 'UPDATE_INFO',
    MANAGE_MEMBERS = 'MANAGE_MEMBERS',
    DELETE_DEALERSHIP = 'DELETE_DEALERSHIP'
}

export const DEALERSHIP_ROLE_PERMISSIONS: Record<DealershipRoleEnum, DealershipMemberPermissionsEnum[]> = {
    [DealershipRoleEnum.OWNER]: [
        ...Object.values(DealershipMemberPermissionsEnum)
    ],
    [DealershipRoleEnum.MANAGER]: [
        DealershipMemberPermissionsEnum.MANAGE_MEMBERS,
    ],
    [DealershipRoleEnum.SELLER]: [],
};