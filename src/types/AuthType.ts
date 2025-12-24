import type {User} from "../../prisma/src/generated/prisma/client.ts";
import {TokenPairType} from "./TokenType.ts";

type SignResultType = {user: User, tokenPair: TokenPairType}
type SignInType = Pick<User, "email" | "password">

export type {SignResultType, SignInType}