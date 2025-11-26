import type {User} from "../../prisma/src/generated/prisma/client.ts";
import {regionService} from "../services/region.service.ts";
import {roleService} from "../services/role.service.ts";
import {TokenPairType} from "../types/TokenType.js";

class UsersPresenter{
    public async toListResDto(
        users: User[],
    ) {
        return await Promise.all(users.map(async user => await this.resUser(user)))
    }

    public async resUser(user: User){
        const [region, role] = await Promise.all([await regionService.getRegionName(user.region_id), await roleService.getRoleName(user.role_id)])
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
            "accountType": user.account_type,
            "balance": user.balance,
            "currency": user.currency,
            "premium_since": user.premium_since,
            "premium_until": user.premium_until,
            "isVerified": user.is_verified,
            "isActive": user.is_active,
            "isDeleted": user.is_deleted,
        }
    }

    public resToken(tokenPair: TokenPairType){
        return {
            "accessToken": tokenPair.access_token,
            "refreshToken": tokenPair.refresh_token
        }
    }


    public async resUserWithTokenPair(user: User, tokenPair: TokenPairType) {
        return {user: await this.resUser(user), tokenPair: this.resToken(tokenPair)}
    }


}

export const userPresenter = new UsersPresenter();