import { UserCreateDTOType } from "../types/UserType.ts";
import { SignResultType } from "../types/AuthType.ts";
declare class AuthService {
    signUp(user: UserCreateDTOType, region_id: number): Promise<SignResultType>;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=auth.service.d.ts.map