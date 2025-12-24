import { ApiError } from "../errors/api.error.ts";
import { regionRepository } from "../repository/region.repository.ts";
class RegionService {
    async getRegionName(id) {
        const regionRecord = await regionRepository.getRegionById(id);
        if (!regionRecord)
            throw new ApiError("Region not found", 500);
        return regionRecord.name;
    }
    async getRegionId(name) {
        const regionRecord = await regionRepository.getRegionByName(name);
        if (!regionRecord)
            throw new ApiError("Region not found", 400);
        return regionRecord.id;
    }
}
export const regionService = new RegionService();
//# sourceMappingURL=region.service.js.map