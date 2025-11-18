import {roleRepository} from "../repository/role.repository.ts";
import {ApiError} from "../errors/api.error.ts";

class RoleService{
    public async getRoleName(id: number): Promise<string>{
        const roleRecord = await roleRepository.getRoleById(id)
        if(!roleRecord) throw new ApiError("Role not found", 500)
        return roleRecord.name
    }

    public async getRoleId(name: string): Promise<number>{
        const roleRecord = await roleRepository.getRoleByName(name)
        if(!roleRecord) throw new ApiError("Role not found", 500)
        return roleRecord.id
    }

    public async getCustomerId(): Promise<number>{
        return await this.getRoleId("customer")
    }
}

export const roleService = new RoleService()