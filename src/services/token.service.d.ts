import { TokenPairType, TokenPayloadType } from "../types/TokenType.ts";
import { TokenTypeEnum } from "../enums/token.type.enum.ts";
declare class TokenService {
    generateTokenPair(payload: TokenPayloadType): TokenPairType;
    verifyToken(token: string, type: TokenTypeEnum): TokenPayloadType;
    generateActionToken(payload: TokenPayloadType, type: Exclude<TokenTypeEnum, "access" | "refresh">): string;
}
export declare const tokenService: TokenService;
export {};
//# sourceMappingURL=token.service.d.ts.map