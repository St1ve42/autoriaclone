import type {UserCreateInput, UserOrderByWithRelationInput, UserUpdateInput, UserWhereInput} from "../../prisma/src/generated/prisma/models/User.ts";
import {prisma} from "../../prisma/prisma.client.ts";
import type {User} from "../../prisma/src/generated/prisma/client.ts";
import type {UserQueryType} from "../types/QueryType.ts";
import type {UserListReturnType} from "../types/ListReturnType.ts";
import {UserWithIncludedPermissionType, UserWithIncludedRegionAndRoleType} from "../types/UserWithIncludeDataType.ts";

class UserRepository{
    public async getList(query: UserQueryType): Promise<UserListReturnType> {
        const {page, limit, skip, search, searchBy, orderBy, order} = query
        let filter: UserWhereInput = {}
        let sort: UserOrderByWithRelationInput = {}
        if(search && searchBy){
            filter[searchBy] = {contains: search}
        }
        if(orderBy && order){
            sort[orderBy] = order
        }
        return await Promise.all([prisma.user.findMany({take: limit, skip: limit*(page-1) + skip, where: filter, orderBy: sort, include: {role: true, region: true}}), prisma.user.count({where: filter})])
    }

    public async getById(id: string): Promise<UserWithIncludedRegionAndRoleType | null>{
        return await prisma.user.findUnique({where: {id}, include: {role: true, region: true}})
    }

    public async getByParams(params: Partial<User>){
        return await prisma.user.findFirst({where: params, include: {role: true, region: true}})
    }

    public async create(dto: UserCreateInput){
        return await prisma.user.create({data: dto, include: {role: true, region: true}})
    }

    public async updateByIdAndParams(id: string, dto: UserUpdateInput): Promise<UserWithIncludedRegionAndRoleType | null>{
        return await prisma.user.update({where: {id}, data: dto, include: {role: true, region: true}})
    }

    public async deleteById(id: string){
        return await prisma.user.update({where: {id}, data: {is_deleted: true}, include: {role: true, region: true}})
    }

    public async getNestedPermissions(id: string): Promise<UserWithIncludedPermissionType | null>{
        return await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                role: {
                    include: {
                        RolePermission: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        })
    }

}

export const userRepository = new UserRepository()

