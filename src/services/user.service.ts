import {userRepository} from "../repository/user.repository.ts";
import type {UserCreateInput, UserUpdateInput} from "../../prisma/src/generated/prisma/models/User.ts";
import type {UserCreateDTOType, UserUpdateDTOType} from "../types/UserType.ts";
import {roleService} from "./role.service.ts";
import {User} from "../../prisma/src/generated/prisma/client.ts";
import {UserQueryType} from "../types/QueryType.ts";
import {RoleUpdateOneRequiredWithoutUserNestedInput} from "../../prisma/src/generated/prisma/models/Role.js";
import {RegionUpdateOneRequiredWithoutUserNestedInput} from "../../prisma/src/generated/prisma/models/Region.js";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service.ts";
import {FileItemTypeEnum} from "../enums/generalEnums/FileEnum.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {UserWithIncludedPermissionType, UserWithIncludedRegionAndRoleType} from "../types/UserWithIncludeDataType.ts";
import {BanType} from "../types/BanType.ts";
import {TimeHelper} from "../timeHelper/time.helper.ts";
import {UserListReturnType} from "../types/ListReturnType.ts";
import {tokenRepository} from "../repository/token.repository.ts";
import {GlobalRoleEnums} from "../enums/globalRoleEnums/globalRoleEnums.ts";

class UserService{
    public async getList(query: UserQueryType): Promise<UserListReturnType>{
        return await userRepository.getList(query)
    }

    public async get(id: string): Promise<UserWithIncludedRegionAndRoleType>{
        return await userRepository.getById(id) as UserWithIncludedRegionAndRoleType
    }

    public async getByEmail(email: string): Promise<UserWithIncludedRegionAndRoleType | null>{
        return await userRepository.getByParams({email})
    }

    public async create(dto: UserCreateDTOType): Promise<UserWithIncludedRegionAndRoleType>{
        const roleId = await roleService.getIdByName(GlobalRoleEnums.USER)
        const {region_id, ...rest} = dto
        const userCreateData: UserCreateInput = {...rest, Role: {connect: {id: roleId}}, Region: {connect: {id: region_id}}}
        return await userRepository.create(userCreateData)
    }

    public async delete(id: string): Promise<UserWithIncludedRegionAndRoleType>{
        return await userRepository.deleteById(id) as UserWithIncludedRegionAndRoleType
    }

    public async isDeleted(id: string): Promise<boolean>{
        const user = await userService.get(id)
        return user.is_deleted
    }

    public async activate(id: string): Promise<UserWithIncludedRegionAndRoleType>{
        return await userRepository.updateByIdAndParams(id, {is_active: true}) as UserWithIncludedRegionAndRoleType
    }

    public async deactivate(id: string): Promise<UserWithIncludedRegionAndRoleType>{
        return await userRepository.updateByIdAndParams(id, {is_active: false}) as UserWithIncludedRegionAndRoleType
    }

    public async verify(id: string): Promise<UserWithIncludedRegionAndRoleType>{
        return await userRepository.updateByIdAndParams(id, {is_verified: true}) as UserWithIncludedRegionAndRoleType
    }

    public async unverify(id: string): Promise<UserWithIncludedRegionAndRoleType>{
        return await userRepository.updateByIdAndParams(id, {is_verified: false}) as UserWithIncludedRegionAndRoleType
    }

    public async isActive(id: string): Promise<boolean>{
        return (await userRepository.getById(id) as User).is_active
    }

    public async isBanned(id: string): Promise<boolean>{
        return (await userRepository.getById(id) as User).is_banned
    }

    public async update(id: string, dto: UserUpdateDTOType): Promise<UserWithIncludedRegionAndRoleType>{
        const {region_id, ...restDTO} = dto
        const connection: {role?: RoleUpdateOneRequiredWithoutUserNestedInput, region?: RegionUpdateOneRequiredWithoutUserNestedInput} = {}
        if(region_id){
            connection.region = {connect: {id: region_id}}
        }
        const input: UserUpdateInput = {...restDTO, ...connection}
        return await userRepository.updateByIdAndParams(id, input) as UserWithIncludedRegionAndRoleType
    }


    public async uploadAvatar(file: UploadedFile, id: string): Promise<UserWithIncludedRegionAndRoleType>{
        const avatarPath = await s3Service.uploadFile(FileItemTypeEnum.USER, id, file)
        const user = await userRepository.getById(id) as UserWithIncludedRegionAndRoleType
        if(user.photo){
            await s3Service.deleteFile(user.photo)
        }
        return await userRepository.updateByIdAndParams(id, {photo: avatarPath}) as UserWithIncludedRegionAndRoleType
    }

    public async deleteAvatar(id: string): Promise<UserWithIncludedRegionAndRoleType>{
        const user = await userRepository.getById(id) as User
        if(!user.photo){
            throw new ApiError('Аватар не знайдено', StatusCodeEnum.NOT_FOUND)
        }
        await s3Service.deleteFile(user.photo)
        return await userRepository.updateByIdAndParams(id, {photo: null}) as UserWithIncludedRegionAndRoleType
    }

    public async isHasPermission(id: string, permissionName: string){
        const user = await userRepository.getNestedPermissions(id) as UserWithIncludedPermissionType
        return user.Role.RolePermission.some(rolePermission => rolePermission.Permission.name === permissionName)
    }

    public async ban(id: string, body: BanType){
        const {time, reason} = body
        const data: {is_banned: boolean, banned_until: Date, ban_reason?: string} = {is_banned: true, banned_until: TimeHelper.addTime(100, "years")}
        if(time){
            const {value, unit} = TimeHelper.parseTime(time)
            data.banned_until = TimeHelper.addTime(value, unit)
        }
        if(reason){
            data.ban_reason = reason
        }
        return await userRepository.updateByIdAndParams(id, data) as UserWithIncludedRegionAndRoleType
    }

    public async unban(id: string){
        return await userRepository.updateByIdAndParams(id, {is_banned: false, banned_until: null, ban_reason: null}) as UserWithIncludedRegionAndRoleType
    }

    public async assignManager(id: string){
        const managerId = await roleService.getIdByName("manager")
        return await userRepository.updateByIdAndParams(id, {Role: {connect: {id: managerId}}}) as UserWithIncludedRegionAndRoleType
    }

    public async unassignManager(id: string){
        const userId = await roleService.getIdByName("user")
        return await userRepository.updateByIdAndParams(id, {Role: {connect: {id: userId}}}) as UserWithIncludedRegionAndRoleType
    }

    public async deleteMe(id: string){
        await tokenRepository.deleteManyByParams({user_id: id})
        return await userRepository.deleteById(id) as UserWithIncludedRegionAndRoleType
    }

}

export const userService = new UserService()