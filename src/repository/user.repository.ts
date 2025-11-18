import type {UserCreateInput} from "../../prisma/src/generated/prisma/models/User.ts";
import {prisma} from "../../prisma/prisma.client.ts";
import type {User} from "../../prisma/src/generated/prisma/client.ts";
import type {UserUpdateDTOType} from "../types/UserType.ts";

class UserRepository{
    public async getUsers(){
        return await prisma.user.findMany()
    }

    public async getUserById(id: string){
        return await prisma.user.findUnique({where: {id}})
    }

    public async getUserByParams(params: Partial<User>){
        return await prisma.user.findFirst({where: params})
    }

    public async createUser(dto: UserCreateInput){
        return await prisma.user.create({data: dto})
    }

    public async updateUserByIdAndParams(id: string, dto: UserUpdateDTOType){
        return await prisma.user.update({where: {id}, data: dto})
    }

    public async deleteUserById(id: string){
        return await prisma.user.delete({where: {id}})
    }

}

export const userRepository = new UserRepository()

