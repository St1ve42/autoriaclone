import { prisma } from "../../prisma/prisma.client.ts";
class RegionRepository {
    async getRegionByName(name) {
        return await prisma.region.findFirst({ where: { name } });
    }
    async getRegionById(id) {
        return await prisma.region.findUnique({ where: { id } });
    }
}
export const regionRepository = new RegionRepository();
//# sourceMappingURL=region.repository.js.map