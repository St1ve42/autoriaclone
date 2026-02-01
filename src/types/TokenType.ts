import type {Token} from "../../prisma/src/generated/prisma/client.ts"

type TokenPairType = Pick<Token, "refresh_token" | "access_token">
type RefreshTokenType = {refreshToken: string}
type TokenPayloadType = {
    user_id: string,
    role_id: number,
    iat?: number,
    exp?: number
}



export type {TokenPairType, RefreshTokenType, TokenPayloadType}