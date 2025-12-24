import { prisma } from "../../prisma/prisma.client.ts";
class UserRepository {
    async getUsers() {
        return await prisma.user.findMany();
    }
    async getUserById(id) {
        return await prisma.user.findUnique({ where: { id } });
    }
    async getUserByParams(params) {
        return await prisma.user.findFirst({ where: params });
    }
    async createUser(dto) {
        return await prisma.user.create({ data: dto });
    }
    async updateUserByIdAndParams(id, dto) {
        return await prisma.user.update({ where: { id }, data: dto });
    }
    async deleteUserById(id) {
        return await prisma.user.delete({ where: { id } });
    }
}
export const userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map