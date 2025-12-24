import { roleRepository } from "../repository/role.repository.ts";
import { ApiError } from "../errors/api.error.ts";
class RoleService {
    async getRoleName(id) {
        const roleRecord = await roleRepository.getRoleById(id);
        if (!roleRecord)
            throw new ApiError("Role not found", 500);
        return roleRecord.name;
    }
    async getRoleId(name) {
        const roleRecord = await roleRepository.getRoleByName(name);
        if (!roleRecord)
            throw new ApiError("Role not found", 500);
        return roleRecord.id;
    }
    async getCustomerId() {
        return await this.getRoleId("customer");
    }
}
export const roleService = new RoleService();
//# sourceMappingURL=role.service.js.map