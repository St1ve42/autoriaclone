import jwt from "jsonwebtoken";
import { configs } from "../configs/configs.ts";
import { ApiError } from "../errors/api.error.ts";
import { TokenTypeEnum } from "../enums/token.type.enum.ts";
class TokenService {
    generateTokenPair(payload) {
        const access_token = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
            expiresIn: configs.JWT_ACCESS_LIFETIME
        });
        const refresh_token = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
            expiresIn: configs.JWT_REFRESH_LIFETIME
        });
        return { access_token, refresh_token };
    }
    verifyToken(token, type) {
        try {
            let secret;
            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
                case TokenTypeEnum.ACTIVATE:
                    secret = configs.JWT_ACTIVATE_SECRET;
                    break;
                case TokenTypeEnum.RECOVERY:
                    secret = configs.JWT_RECOVERY_SECRET;
                    break;
            }
            return jwt.verify(token, secret);
        }
        catch {
            throw new ApiError("Invalid token", 401);
        }
    }
    generateActionToken(payload, type) {
        let secret;
        let lifetime;
        switch (type) {
            case TokenTypeEnum.ACTIVATE:
                secret = configs.JWT_REFRESH_SECRET;
                lifetime = configs.JWT_REFRESH_LIFETIME;
                break;
            case TokenTypeEnum.RECOVERY:
                secret = configs.JWT_RECOVERY_SECRET;
                lifetime = configs.JWT_RECOVERY_LIFETIME;
        }
        return jwt.sign(payload, secret, {
            expiresIn: lifetime
        });
    }
}
export const tokenService = new TokenService();
//# sourceMappingURL=token.service.js.map