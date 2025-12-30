import type {UserCreateInput, UserOrderByWithRelationInput, UserUpdateInput, UserWhereInput} from "../../prisma/src/generated/prisma/models/User.ts";
import {prisma} from "../../prisma/prisma.client.ts";
import type {User} from "../../prisma/src/generated/prisma/client.ts";
import type {UserQueryType} from "../types/QueryType.ts";
import type {UserListReturnType} from "../types/ListReturnType.ts";

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
        return await Promise.all([prisma.user.findMany({take: limit, skip: limit*(page-1) + skip, where: filter, orderBy: sort}), prisma.user.count({where: filter})])
    }

    public async getById(id: string){
        return await prisma.user.findUnique({where: {id}, include: {role: {include: {}}}})
    }

    public async getByParams(params: Partial<User>){
        return await prisma.user.findFirst({where: params})
    }

    public async create(dto: UserCreateInput){
        return await prisma.user.create({data: dto})
    }

    public async updateByIdAndParams(id: string, dto: UserUpdateInput){
        return await prisma.user.update({where: {id}, data: dto})
    }

    public async deleteById(id: string){
        return await prisma.user.update({where: {id}, data: {is_deleted: true}})
    }

    public async getNestedPermissions(id: string){
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

