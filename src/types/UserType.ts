import type {UserCreateInput, UserUpdateInput} from "../../prisma/src/generated/prisma/models/User.ts";

type UserCreateDTOType = Pick<UserCreateInput, "name" | "surname" | "age" | "email" | "password" | "city" | "gender" | "phone" | "photo"> & {region: number}
type UserUpdateDTOType = Omit<UserUpdateInput, "created_at" | "updated_at" | "role" | "token" | "region" | "email" | "password"> & {region?: number}

export type {UserCreateDTOType, UserUpdateDTOType}