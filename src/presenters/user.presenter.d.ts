import type { User } from "../../prisma/src/generated/prisma/client.ts";
declare class UsersPresenter {
    toListResDto(users: User[]): Promise<{
        id: string;
        name: string;
        surname: string;
        age: number;
        email: string;
        password: string;
        phone: string | null;
        gender: import("../../prisma/src/generated/prisma/enums.ts").GenderEnum | null;
        photo: string | null;
        city: string;
        region: string;
        role: string;
        account_type: import("../../prisma/src/generated/prisma/enums.ts").AccountTypeEnum;
        balance: number;
        currency: import("../../prisma/src/generated/prisma/enums.ts").CurrencyEnum;
        premium_since: Date | null;
        premium_until: Date | null;
        is_verified: boolean;
        is_active: boolean;
        is_deleted: boolean;
        created_at: string;
        updated_at: string;
    }[]>;
    resUser(user: User): Promise<{
        id: string;
        name: string;
        surname: string;
        age: number;
        email: string;
        password: string;
        phone: string | null;
        gender: import("../../prisma/src/generated/prisma/enums.ts").GenderEnum | null;
        photo: string | null;
        city: string;
        region: string;
        role: string;
        account_type: import("../../prisma/src/generated/prisma/enums.ts").AccountTypeEnum;
        balance: number;
        currency: import("../../prisma/src/generated/prisma/enums.ts").CurrencyEnum;
        premium_since: Date | null;
        premium_until: Date | null;
        is_verified: boolean;
        is_active: boolean;
        is_deleted: boolean;
        created_at: string;
        updated_at: string;
    }>;
}
export declare const userPresenter: UsersPresenter;
export {};
//# sourceMappingURL=user.presenter.d.ts.map