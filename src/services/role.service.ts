import {roleRepository} from "../repository/role.repository.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {Role} from "../../prisma/src/generated/prisma/client.ts";

class RoleService{
    public async getNameById(id: number): Promise<string>{
        const roleRecord = await roleRepository.getById(id)
        if(!roleRecord) throw new Error("Role not found")
        return roleRecord.name
    }

    public async getIdByName(name: string): Promise<number>{
        const roleRecord = await roleRepository.getByName(name)
        if(!roleRecord) throw new ApiError("Role not found", StatusCodeEnum.NOT_FOUND)
        return roleRecord.id
    }

    public async getCustomerId(): Promise<number>{
        return await this.getIdByName("customer")
    }

    public async getList(): Promise<Role[]>{
        return await roleRepository.getList()
    }

}

export const roleService = new RoleService()