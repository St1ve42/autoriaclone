import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error.ts";
declare class ErrorController {
    showError(error: Error | ApiError, req: Request, res: Response, next: NextFunction): Promise<void>;
    showNonExistentApiError(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const errorController: ErrorController;
export {};
//# sourceMappingURL=error.controller.d.ts.map