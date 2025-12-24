import { userService } from "../services/user.service.ts";
import { userPresenter } from "../presenters/user.presenter.ts";
class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            res.status(200).json(await userPresenter.toListResDto(users));
        }
        catch (e) {
            next(e);
        }
    }
    async getUser(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await userService.getUser(userId);
            res.status(200).json(await userPresenter.resUser(user));
        }
        catch (e) {
            next(e);
        }
    }
    async createUser(req, res, next) {
        try {
            const body = req.body;
            const { region_id } = res.locals;
            const user = await userService.createUser(body, region_id);
            res.status(201).json(await userPresenter.resUser(user));
        }
        catch (e) {
            next(e);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await userService.deleteUser(userId);
            res.status(200).json(await userPresenter.resUser(user));
        }
        catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
//# sourceMappingURL=user.controller.js.map