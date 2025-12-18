import type {UserCreateInput, UserOrderByWithRelationInput, UserUpdateInput, UserWhereInput} from "../../prisma/src/generated/prisma/models/User.ts";
import {prisma} from "../../prisma/prisma.client.ts";
import type {User} from "../../prisma/src/generated/prisma/client.ts";
import type {UserQueryType} from "../types/QueryType.ts";

class UserRepository{
    public async getList(query: UserQueryType){
        const {page, limit, skip, search, search_by, order_by, order} = query
        let filter: UserWhereInput = {}
        let sort: UserOrderByWithRelationInput = {}
        if(search && search_by){
            filter[search_by] = {contains: search}
        }
        if(order_by && order){
            sort[order_by] = order
        }
        return await prisma.user.findMany({take: limit, skip: limit*(page-1) + skip, where: filter, orderBy: sort})
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

