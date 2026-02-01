import type {UserCreateInput, UserUpdateInput} from "../../prisma/src/generated/prisma/models/User.ts";

type UserCreateDTOType = Pick<UserCreateInput, "name" | "surname" | "age" | "email" | "password" | "city" | "gender" | "phone" | "photo"> & {region_id: number}
type UserUpdateDTOType = Omit<UserUpdateInput, "created_at" | "updated_at" | "role" | "token" | "region" | "email" | "password"> & {region_id?: number}

export type {UserCreateDTOType, UserUpdateDTOType}