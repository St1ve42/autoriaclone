import {UserGetPayload} from "../../prisma/src/generated/prisma/models/User.ts";

type UserWithIncludedRegionAndRoleType = UserGetPayload<{include: {Role: true, Region: true}}>
type UserWithIncludedPermissionType = UserGetPayload<{include: {Role: {include: {RolePermission: {include: {Permission: true}}}}}}>

export type {UserWithIncludedRegionAndRoleType, UserWithIncludedPermissionType}