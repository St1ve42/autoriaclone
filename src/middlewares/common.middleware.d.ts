import joi from "joi";
import type { Request, Response, NextFunction } from "express";
declare class CommonMiddleware {
    validateBody(validator: joi.ObjectSchema): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    validateId(idParamName: string, db: "mysql" | "mongodb"): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export declare const commonMiddleware: CommonMiddleware;
export {};
//# sourceMappingURL=common.middleware.d.ts.map