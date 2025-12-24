import { ApiError } from "../errors/api.error.ts";
class ErrorController {
    async showError(error, req, res, next) {
        console.log(error);
        const status = error instanceof ApiError ? error.status : 500;
        res.status(status).json({
            status,
            message: error.message
        });
    }
    async showNonExistentApiError(req, res, next) {
        res.status(400).json({
            status: 400,
            message: "No existent API route or method"
        });
    }
}
export const errorController = new ErrorController();
//# sourceMappingURL=error.controller.js.map