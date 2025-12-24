import type { Request, Response, NextFunction } from "express";
declare class UserController {
    getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const userController: UserController;
export {};
//# sourceMappingURL=user.controller.d.ts.map