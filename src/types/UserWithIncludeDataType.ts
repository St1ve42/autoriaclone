import {UserGetPayload} from "../../prisma/src/generated/prisma/models/User.ts";

type UserWithIncludedRegionAndRoleType = UserGetPayload<{include: {role: true, region: true}}>
type UserWithIncludedPermissionType = UserGetPayload<{include: {role: {include: {RolePermission: {include: {permission: true}}}}}}>

export type {UserWithIncludedRegionAndRoleType, UserWithIncludedPermissionType}