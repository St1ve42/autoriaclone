import { prisma } from "../../prisma/prisma.client.ts";
class TokenRepository {
    async createToken(token) {
        return await prisma.token.create({ data: token });
    }
}
export const tokenRepository = new TokenRepository();
//# sourceMappingURL=token.repository.js.map