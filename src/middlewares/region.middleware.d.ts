import type { Request, Response, NextFunction } from "express";
declare class RegionMiddleware {
    validateRegion(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const regionMiddleware: RegionMiddleware;
export {};
//# sourceMappingURL=region.middleware.d.ts.map