import type {User} from "../../prisma/src/generated/prisma/client.ts";
import {regionService} from "../service/region.service.ts";
import {roleService} from "../service/role.service.ts";

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
            "password": user.password,
            "phone": user.phone,
            "gender": user.gender,
            "photo": user.photo,
            "city": user.city,
            "region": region,
            "role": role,
            "account_type": user.account_type,
            "balance": user.balance,
            "currency": user.currency,
            "premium_since": user.premium_since,
            "premium_until": user.premium_until,
            "is_verified": user.is_verified,
            "is_active": user.is_active,
            "is_deleted": user.is_deleted,
            "created_at": "2025-11-18T13:27:00.516Z",
            "updated_at": "2025-11-18T13:27:00.516Z",
        }
    }
}

export const userPresenter = new UsersPresenter();