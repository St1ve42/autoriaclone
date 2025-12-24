import type { User } from "../../prisma/src/generated/prisma/client.ts";
import { TokenPairType } from "./TokenType.ts";
type SignResultType = {
    user: User;
    tokenPair: TokenPairType;
};
export type { SignResultType };
//# sourceMappingURL=AuthType.d.ts.map