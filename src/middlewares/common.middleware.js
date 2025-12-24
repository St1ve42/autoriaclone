import joi from "joi";
import { ApiError } from "../errors/api.error.ts";
import { isObjectIdOrHexString } from "mongoose";
import { validate } from "uuid";
class CommonMiddleware {
    validateBody(validator) {
        return async (req, res, next) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            }
            catch (e) {
                if (e instanceof joi.ValidationError) {
                    throw new ApiError(e.details[0].message, 400);
                }
                next(e);
            }
        };
    }
    validateId(idParamName, db) {
        return async (req, res, next) => {
            try {
                if (db === "mongodb" && !isObjectIdOrHexString(req.params[idParamName]) || db === "mysql" && !validate(req.params[idParamName]))
                    throw new ApiError("Not correct id", 400);
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
export const commonMiddleware = new CommonMiddleware();
//# sourceMappingURL=common.middleware.js.map