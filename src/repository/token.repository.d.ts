import { TokenCreateInput } from "../../prisma/src/generated/prisma/models/Token.ts";
import { Token } from "../../prisma/src/generated/prisma/client.ts";
declare class TokenRepository {
    createToken(token: TokenCreateInput): Promise<Token>;
}
export declare const tokenRepository: TokenRepository;
export {};
//# sourceMappingURL=token.repository.d.ts.map