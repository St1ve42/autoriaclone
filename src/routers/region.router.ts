import {Router} from "express";
import {regionController} from "../controllers/region.controller.ts";
import {commonMiddleware} from "../middlewares/common.middleware.ts";
import {QueryValidator} from "../vaildators/query.validator.ts";

const router = Router()

router.get('/', commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), regionController.getList)

export const regionRouter = router