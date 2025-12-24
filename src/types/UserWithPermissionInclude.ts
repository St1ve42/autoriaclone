import {userRepository} from "../repository/user.repository.ts";

type UserGetNestedPermissionsType = Awaited<ReturnType<typeof userRepository.getNestedPermissions>>
type UserGetNestedPermissionsWithoutNullType = NonNullable<UserGetNestedPermissionsType>;

export type {UserGetNestedPermissionsWithoutNullType, UserGetNestedPermissionsType}