import { Router } from "express";
import { UserValidator } from "../vaildators/user.validator.ts";
import { commonMiddleware } from "../middlewares/common.middleware.ts";
import { userMiddleware } from "../middlewares/user.middleware.ts";
import { regionMiddleware } from "../middlewares/region.middleware.ts";
import { authController } from "../controllers/auth.controller.ts";
const router = Router();
router.post('/sign-up', commonMiddleware.validateBody(UserValidator.createUser), userMiddleware.checkEmailTaken, regionMiddleware.validateRegion, authController.signUp);
export const authRouter = router;
//# sourceMappingURL=auth.router.js.map