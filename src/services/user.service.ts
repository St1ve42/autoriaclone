import {userRepository} from "../repository/user.repository.ts";
import type {UserCreateInput, UserUpdateInput} from "../../prisma/src/generated/prisma/models/User.ts";
import type {UserCreateDTOType, UserUpdateDTOType} from "../types/UserType.ts";
import {roleService} from "./role.service.ts";
import type {User} from "../../prisma/src/generated/prisma/client.ts";

class UserService{
    public async getUsers(){
        return await userRepository.getUsers()
    }

    public async getUser(id: string){
        return await userRepository.getUserById(id) as User
    }

    public async getUserByEmail(email: string): Promise<User | null>{
        return await userRepository.getUserByParams({email})
    }

    public async createUser(userDTO: UserCreateDTOType, regionId: number){
        const roleId = await roleService.getCustomerId()
        const userCreateData: UserCreateInput = {...userDTO, role: {connect: {id: roleId}}, region: {connect: {id: regionId}}}
        return await userRepository.createUser(userCreateData)
    }

    public async deleteUser(id: string){
        return await userRepository.deleteUserById(id) as User
    }

    // public async updateUser(id: string, dto: UserUpdateDTOType){
    //     const data = {...dto, }
    //     return await userRepository.updateUserByIdAndParams(id, dto) as User
    // }



}

export const userService = new UserService()