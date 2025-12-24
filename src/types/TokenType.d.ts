import type { Token } from "../../prisma/src/generated/prisma/client.ts";
type TokenPairType = Pick<Token, "refresh_token" | "access_token">;
type TokenPayloadType = {
    user_id: string;
    role_id: number;
};
export type { TokenPairType, TokenPayloadType };
//# sourceMappingURL=TokenType.d.ts.map