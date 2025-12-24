import type {User} from "../../prisma/src/generated/prisma/client.ts";
import {regionService} from "../services/region.service.ts";
import {roleService} from "../services/role.service.ts";
import {TokenPairType} from "../types/TokenType.ts";
import {UserQueryType} from "../types/QueryType.ts";

class UserPresenter{
    public async list(
        users: User[],
        total: number,
        query: UserQueryType
    ) {
        return {
            data: await Promise.all(users.map(this.res)),
            total,
            ...query
        }
    }

    public async res(user: User){
        const [region, role] = await Promise.all([await regionService.getNameById(user.region_id), await roleService.getNameById(user.role_id)])
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
            "region": region,
            "role": role,
            "account_type": user.account_type,
            "balance": user.balance,
            "currency": user.currency,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "is_banned": user.is_banned,
            "ban_reason": user.ban_reason,
            "banned_until": user.banned_until,
            "is_deleted": user.is_deleted,
        }
    }

    public resToken(tokenPair: TokenPairType){
        return {
            "access_token": tokenPair.access_token,
            "refresh_token": tokenPair.refresh_token
        }
    }


    public async resUserWithTokenPair(user: User, tokenPair: TokenPairType) {
        return {user: await this.res(user), tokenPair: this.resToken(tokenPair)}
    }


}

export const userPresenter = new UserPresenter();