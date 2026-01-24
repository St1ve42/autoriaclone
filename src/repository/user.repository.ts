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
        if(String(search) && searchBy){
            let filterInput: object = {equals: search};
            const enumFields = ["account_type"]
            if(typeof search === "string" && !enumFields.includes(searchBy)){
                filterInput = {contains: search}
            }
            filter[searchBy] = filterInput
        }
        if(orderBy && order){
            sort[orderBy] = order
        }
        return await Promise.all([prisma.user.findMany({take: limit, skip: limit*(page-1) + skip, where: filter, orderBy: sort, include: {Role: true, Region: true}}), prisma.user.count({where: filter})])
    }

    public async getById(id: string): Promise<UserWithIncludedRegionAndRoleType | null>{
        return await prisma.user.findUnique({where: {id}, include: {Role: true, Region: true}})
    }

    public async getByParams(params: Partial<User>){
        return await prisma.user.findFirst({where: params, include: {Role: true, Region: true}})
    }

    public async create(dto: UserCreateInput){
        return await prisma.user.create({data: dto, include: {Role: true, Region: true}})
    }

    public async updateByIdAndParams(id: string, dto: UserUpdateInput): Promise<UserWithIncludedRegionAndRoleType | null>{
        return await prisma.user.update({where: {id}, data: dto, include: {Role: true, Region: true}})
    }

    public async deleteById(id: string){
        return await prisma.user.update({where: {id}, data: {is_deleted: true}, include: {Role: true, Region: true}})
    }

    public async getNestedPermissions(id: string): Promise<UserWithIncludedPermissionType | null>{
        return await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                Role: {
                    include: {
                        RolePermission: {
                            include: {
                                Permission: true
                            }
                        }
                    }
                }
            }
        })
    }

}

export const userRepository = new UserRepository()

