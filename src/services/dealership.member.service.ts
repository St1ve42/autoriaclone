import {DealershipMemberAddDTOType, DealershipMemberType, DealershipMemberUpdateDTOType} from "../types/DealershipMemberType.ts";
import {dealershipMemberRepository} from "../repository/dealership.member.repository.ts";
import {userService} from "./user.service.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {DEALERSHIP_ROLE_PERMISSIONS, DealershipMemberPermissionsEnum} from "../constants/dealership.member.role.permissions.ts";
import {AdminRoleEnums} from "../enums/adminEnums/admin.role.enums.ts";
import {DealershipMemberQueryType} from "../types/QueryType.ts";

class DealershipMemberService{
    public async get(memberId: string){
        return await dealershipMemberRepository.get(memberId) as DealershipMemberType
    }

    public async getMembersByDealershipId(dealershipId: string, query: DealershipMemberQueryType): Promise<[DealershipMemberType[], number]>{
        return await dealershipMemberRepository.getList(dealershipId, query)
    }

    public async addMember(dealershipId: string, dto: DealershipMemberAddDTOType): Promise<DealershipMemberType>{
        const {email, role} = dto
        const user = await userService.getByEmail(email)
        if(!user){
            throw new ApiError("Користувача не існує", StatusCodeEnum.NOT_FOUND)
        }
        const {id: user_id} = user
        const member = await dealershipMemberRepository.findOneByParams({dealership_id: dealershipId, user_id})
        if(member){
            if(member.dealership_id.toString() === dealershipId){
                throw new ApiError("Користувач вже є членом поточного автосалона", StatusCodeEnum.CONFLICT)
            }
            throw new ApiError("Користувач є членом інакшого автосалона", StatusCodeEnum.CONFLICT)
        }
        return await dealershipMemberRepository.create({dealership_id: dealershipId, user_id: user.id, role})
    }

    public async deleteMember(memberId: string): Promise<DealershipMemberType>{
        return await dealershipMemberRepository.delete(memberId) as DealershipMemberType
    }

    public async isHasPermission(permissionName: DealershipMemberPermissionsEnum, user_id: string, dealership_id: string){
        const user = await userService.get(user_id)
        const isAdmin = Object.values(AdminRoleEnums).some(roleName => user.Role.name === roleName)
        if(isAdmin){
            return true
        }
        const member = await dealershipMemberRepository.findOneByParams({user_id})
        if(!member || member.dealership_id.toString() !== dealership_id){
            throw new ApiError("Доступ заборонений", StatusCodeEnum.FORBIDDEN)
        }
        return DEALERSHIP_ROLE_PERMISSIONS[member.role].some(permissionInList => permissionInList === permissionName) || isAdmin
    }

    public async getUserMembership(user_id: string){
        const member = await dealershipMemberRepository.findOneByParams({user_id})
        if(!member){
            throw new ApiError("Користувач не є членом жодного автосалона", StatusCodeEnum.NOT_FOUND)
        }
        return member
    }

    public async getUserReviews(user_id: string){
        const reviews = await dealershipMemberRepository.findManyByParams({user_id})
        if(reviews.length === 0){
            throw new ApiError("Користувач не має відгуків", StatusCodeEnum.NOT_FOUND)
        }
        return reviews
    }

    public async update(memberId: string, dto: DealershipMemberUpdateDTOType){
        return await dealershipMemberRepository.update(memberId, {role: dto.role}) as DealershipMemberType
    }

}

export const dealershipMemberService = new DealershipMemberService()