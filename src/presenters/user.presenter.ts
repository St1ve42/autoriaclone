import {TokenPairType} from "../types/TokenType.ts";
import {UserQueryType} from "../types/QueryType.ts";
import {UserWithIncludedRegionAndRoleType} from "../types/UserWithIncludeDataType.ts";

class UserPresenter{
    public async list(
        users: UserWithIncludedRegionAndRoleType[],
        total: number,
        query: UserQueryType
    ) {
        return {
            data: await Promise.all(users.map(this.adminRes)),
            total,
            ...query
        }
    }

    public async res(user: UserWithIncludedRegionAndRoleType){
        return {
            "id": user.id,
            "name": user.name,
            "surname": user.surname,
            "age": user.age,
            "email": user.email,
            "phone": user.phone,
            "gender": user.gender,
            "photo": user.photo,
            "city": user.city,
            "region": user.Region.name,
            "role": user.Role.name,
            "account_type": user.account_type,
            "balance": user.balance,
            "currency": user.currency,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "is_banned": user.is_banned,
            "ban_reason": user.ban_reason,
            "banned_until": user.banned_until,
            "is_deleted": user.is_deleted
        }
    }

    public async adminRes(user: UserWithIncludedRegionAndRoleType){
        return {
            "id": user.id,
            "name": user.name,
            "surname": user.surname,
            "age": user.age,
            "email": user.email,
            "phone": user.phone,
            "gender": user.gender,
            "photo": user.photo,
            "city": user.city,
            "region": user.Region.name,
            "role": user.Role.name,
            "account_type": user.account_type,
            "balance": user.balance,
            "currency": user.currency,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "is_banned": user.is_banned,
            "ban_reason": user.ban_reason,
            "banned_until": user.banned_until,
            "is_deleted": user.is_deleted,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }
    }

    public resToken(tokenPair: TokenPairType){
        return {
            "access_token": tokenPair.access_token,
            "refresh_token": tokenPair.refresh_token
        }
    }


    public async resWithTokenPair(user: UserWithIncludedRegionAndRoleType, tokenPair: TokenPairType) {
        return {user: await this.res(user), tokenPair: this.resToken(tokenPair)}
    }

    public publicRes(user: UserWithIncludedRegionAndRoleType){
        return {
            "id": user.id,
            "name": user.name,
            "surname": user.surname,
            "photo": user.photo,
        }
    }

    public announcementRes(user: UserWithIncludedRegionAndRoleType){
        return {
            ...this.publicRes(user),
            "phone": user.phone
        }
    }

    public reviewRes(user: UserWithIncludedRegionAndRoleType){
        return {
            "id": user.id,
            "name": user.name,
            "surname": user.surname,
            "photo": user.photo
        }
    }

}

export const userPresenter = new UserPresenter();