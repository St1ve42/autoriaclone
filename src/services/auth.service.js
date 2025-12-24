import { passwordService } from "./password.service.ts";
import { userService } from "./user.service.ts";
import { tokenService } from "./token.service.ts";
import { TokenTypeEnum } from "../enums/token.type.enum.ts";
import { tokenRepository } from "../repository/token.repository.ts";
class AuthService {
    async signUp(user, region_id) {
        user.password = await passwordService.hashPassword(user.password);
        const newUser = await userService.createUser(user, region_id);
        const payload = { user_id: newUser.id, role_id: newUser.role_id };
        const tokenPair = tokenService.generateTokenPair(payload);
        const actionToken = tokenService.generateActionToken(payload, TokenTypeEnum.ACTIVATE);
        await tokenRepository.createToken({ access_token: tokenPair.access_token, refresh_token: tokenPair.refresh_token, user: { connect: { id: newUser.id } } });
        return { user: newUser, tokenPair };
    }
}
export const authService = new AuthService();
//TODO send mail with activation token to user
//# sourceMappingURL=auth.service.js.map