import { authService } from "../services/auth.service.ts";
class AuthController {
    async signUp(req, res, next) {
        try {
            const body = req.body;
            const { region_id } = res.locals;
            const user = await authService.signUp(body, region_id);
            res.status(201).json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map