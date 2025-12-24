import type { NextFunction, Request, Response } from "express";
declare class AuthController {
    signUp(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const authController: AuthController;
export {};
//# sourceMappingURL=auth.controller.d.ts.map