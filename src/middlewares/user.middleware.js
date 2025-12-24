import { ApiError } from "../errors/api.error.ts";
import { userService } from "../services/user.service.ts";
class UserMiddleware {
    async checkUserExists(req, res, next) {
        try {
            if (!await userService.getUser(req.params["userId"]))
                throw new ApiError("User not found", 404);
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkEmailTaken(req, res, next) {
        try {
            const body = req.body;
            if (await userService.getUserByEmail(body.email))
                throw new ApiError("Email is taken", 409);
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
export const userMiddleware = new UserMiddleware();
//# sourceMappingURL=user.middleware.js.map