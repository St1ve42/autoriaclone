import type { UserCreateInput, UserUpdateInput } from "../../prisma/src/generated/prisma/models/User.ts";
type UserCreateDTOType = Pick<UserCreateInput, "name" | "surname" | "age" | "email" | "password" | "city" | "gender" | "phone" | "photo"> & {
    region: string;
};
type UserUpdateDTOType = Omit<UserUpdateInput, "created_at" | "updated_at" | "role" | "token" | "region" | "email" | "password"> & {
    region?: string;
    role?: string;
};
export type { UserCreateDTOType, UserUpdateDTOType };
//# sourceMappingURL=UserType.d.ts.map