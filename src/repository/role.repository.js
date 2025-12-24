import { prisma } from "../../prisma/prisma.client.ts";
class RoleRepository {
    async getRoleByName(name) {
        return await prisma.role.findFirst({ where: { name } });
    }
    async getRoleById(id) {
        return await prisma.role.findUnique({ where: { id } });
    }
}
export const roleRepository = new RoleRepository();
//# sourceMappingURL=role.repository.js.map