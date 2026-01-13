import type {User} from "../../prisma/src/generated/prisma/client.ts";
import {TokenPairType} from "./TokenType.ts";
import {UserWithIncludedRegionAndRoleType} from "./UserWithIncludeDataType.ts";

type SignResultType = {user: UserWithIncludedRegionAndRoleType, tokenPair: TokenPairType}
type SignInType = Pick<User, "email" | "password">

export type {SignResultType, SignInType}