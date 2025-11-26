import {roleRepository} from "../repository/role.repository.ts";

class RoleService{
    public async getRoleName(id: number): Promise<string>{
        const roleRecord = await roleRepository.getRoleById(id)
        if(!roleRecord) throw new Error("Role not found")
        return roleRecord.name
    }

    public async getRoleId(name: string): Promise<number>{
        const roleRecord = await roleRepository.getRoleByName(name)
        if(!roleRecord) throw new Error("Role not found")
        return roleRecord.id
    }

    public async getCustomerId(): Promise<number>{
        return await this.getRoleId("customer")
    }
}

export const roleService = new RoleService()