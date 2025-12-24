import { Router } from "express";
import { userRouter } from "./user.router.ts";
import { authRouter } from "./auth.router.ts";
const router = Router();
router.use('/users', userRouter);
router.use('/auth', authRouter);
export const apiRouter = router;
//# sourceMappingURL=api.router.js.map