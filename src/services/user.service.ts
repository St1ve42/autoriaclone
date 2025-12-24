import {userRepository} from "../repository/user.repository.ts";
import type {UserCreateInput, UserUpdateInput} from "../../prisma/src/generated/prisma/models/User.ts";
import type {UserCreateDTOType, UserUpdateDTOType} from "../types/UserType.ts";
import {roleService} from "./role.service.ts";
import type {PlanSubscribeEnum, PremiumPlan, User} from "../../prisma/src/generated/prisma/client.ts";
import {CurrencyEnum} from "../../prisma/src/generated/prisma/enums.ts";
import {UserQueryType} from "../types/QueryType.ts";
import {RoleUpdateOneRequiredWithoutUserNestedInput} from "../../prisma/src/generated/prisma/models/Role.js";
import {RegionUpdateOneRequiredWithoutUserNestedInput} from "../../prisma/src/generated/prisma/models/Region.js";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service.ts";
import {FileItemTypeEnum} from "../enums/generalEnums/FileEnum.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {UserGetNestedPermissionsWithoutNullType} from "../types/UserWithPermissionInclude.ts";
import {BanType} from "../types/BanType.ts";
import {ManipulateType} from "dayjs";
import {TimeHelper} from "../timeHelper/time.helper.ts";
import {subscribeRepository} from "../repository/subscribe.repository.ts";
import {premiumPurchasesRepository} from "../repository/premium.purchases.repository.ts";
import {UserListReturnType} from "../types/ListReturnType.ts";

class UserService{
    public async getList(query: UserQueryType): Promise<UserListReturnType>{
        return await userRepository.getList(query)
    }

    public async get(id: string){
        return await userRepository.getById(id) as User
    }

    public async getByEmail(email: string): Promise<User | null>{
        return await userRepository.getByParams({email})
    }

    public async create(userDTO: UserCreateDTOType, regionId: number){
        const roleId = await roleService.getCustomerId()
        const userCreateData: UserCreateInput = {...userDTO, role: {connect: {id: roleId}}, region: {connect: {id: regionId}}}
        return await userRepository.create(userCreateData)
    }

    public async delete(id: string){
        return await userRepository.deleteById(id) as User
    }

    public async isDeleted(id: string){
        const user = await userService.get(id)
        return user.is_deleted
    }

    public async activate(id: string){
        return await userRepository.updateByIdAndParams(id, {is_active: true})
    }

    public async deactivate(id: string){
        return await userRepository.updateByIdAndParams(id, {is_active: false})
    }

    public async isActive(id: string): Promise<boolean>{
        return (await userRepository.getById(id) as User).is_active
    }

    public async update(id: string, dto: UserUpdateDTOType, locals: Partial<Record<"role_id" | "region_id", number>>){
        const {region, role, ...restDTO} = dto
        const {role_id, region_id} = locals
        const connection: {role?: RoleUpdateOneRequiredWithoutUserNestedInput, region?: RegionUpdateOneRequiredWithoutUserNestedInput} = {}
        if(role && role_id){
            connection.role = {connect: {id: role_id}}
        }
        if(region && region_id){
            connection.region = {connect: {id: region_id}}
        }
        const input: UserUpdateInput = {...restDTO, ...connection}
        return await userRepository.updateByIdAndParams(id, input) as User
    }


    public async uploadAvatar(file: UploadedFile, id: string): Promise<User>{
        const avatarPath = await s3Service.uploadFile(FileItemTypeEnum.USER, id, file)
        const user = await userRepository.getById(id) as User
        if(user.photo){
            await s3Service.deleteFile(user.photo)
        }
        return await userRepository.updateByIdAndParams(id, {photo: avatarPath})
    }

    public async deleteAvatar(id: string): Promise<User>{
        const user = await userRepository.getById(id) as User
        if(!user.photo){
            throw new ApiError('Avatar not found', StatusCodeEnum.NOT_FOUND)
        }
        await s3Service.deleteFile(user.photo)
        return await userRepository.updateByIdAndParams(id, {photo: null})
    }

    public async getPermissions(id: string){
        const user = await userRepository.getNestedPermissions(id) as UserGetNestedPermissionsWithoutNullType
        return user.role.RolePermission
    }

    public async isHasPermission(id: string, permissionName: string){
        const rolepermissions = await userService.getPermissions(id)
        return rolepermissions.some(rolepermission => rolepermission.permission.name === permissionName)
    }

    public async isAdmin(id: string){
        const user = await userService.get(id) as User
        const role = await roleService.getNameById(user.role_id)
        console.log(role === "admin")
        return role === "admin"
    }

    public async ban(id: string, body: BanType){
        const {time, reason} = body
        const data: {is_banned: boolean, banned_until: Date, ban_reason?: string} = {is_banned: true, banned_until: TimeHelper.addTime(100, "years")}
        if(time){
            const unit = time[time.length - 1] as ManipulateType
            const value = Number(time.slice(0, time.length - 1))
            data.banned_until = TimeHelper.addTime(value, unit)
        }
        if(reason){
            data.ban_reason = reason
        }
        return await userRepository.updateByIdAndParams(id, data)
    }

    public async unban(id: string){
        return await userRepository.updateByIdAndParams(id, {is_banned: false, banned_until: null, ban_reason: null})
    }

    public async setManager(id: string){
        const managerId = await roleService.getIdByName("manager")
        return await userRepository.updateByIdAndParams(id, {role: {connect: {id: managerId}}})
    }

    public async buySubscribe(id: string, code: PlanSubscribeEnum){
        const user = await userService.get(id)
        const subscribe = await subscribeRepository.get(code) as PremiumPlan
        const diff = user.balance - Number(subscribe.price)
        if(diff < 0){
            throw new ApiError("Transcation is failed. Not enough funds", StatusCodeEnum.PAYMENT_REQUIRED)
        }
        const updatedUser = await userRepository.updateByIdAndParams(id, {balance: diff})
        return await premiumPurchasesRepository.create({price_paid: subscribe.price, currency: CurrencyEnum.UAH, User: {connect: {id}}, purchased_at: new Date(), expires_at: TimeHelper.addTime(subscribe.duration_days ?? 30, "days")})
    }

}

export const userService = new UserService()