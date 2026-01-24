import { regionService } from "../services/region.service.ts";
class RegionMiddleware {
    async validateRegion(req, res, next) {
        try {
            const body = req.body;
            if (body.region) {
                res.locals.region_id = await regionService.getRegionId(body.region + " область");
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
export const regionMiddleware = new RegionMiddleware();
//# sourceMappingURL=region.middleware.js.map