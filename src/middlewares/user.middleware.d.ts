import type { NextFunction, Request, Response } from "express";
declare class UserMiddleware {
    checkUserExists(req: Request, res: Response, next: NextFunction): Promise<void>;
    checkEmailTaken(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const userMiddleware: UserMiddleware;
export {};
//# sourceMappingURL=user.middleware.d.ts.map