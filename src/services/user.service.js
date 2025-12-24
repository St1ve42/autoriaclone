import { userRepository } from "../repository/user.repository.ts";
import { roleService } from "./role.service.ts";
import { ApiError } from "../errors/api.error.ts";
class UserService {
    async getUsers() {
        return await userRepository.getUsers();
    }
    async getUser(id) {
        return await userRepository.getUserById(id);
    }
    async getUserByEmail(email) {
        return await userRepository.getUserByParams({ email });
    }
    async createUser(userDTO, regionId) {
        if (await this.getUserByEmail(userDTO.email))
            throw new ApiError("Email is taken", 409);
        const roleId = await roleService.getCustomerId();
        const userCreateData = { ...userDTO, role: { connect: { id: roleId } }, region: { connect: { id: regionId } } };
        return await userRepository.createUser(userCreateData);
    }
    async deleteUser(id) {
        return await userRepository.deleteUserById(id);
    }
}
export const userService = new UserService();
//# sourceMappingURL=user.service.js.map