import {prisma} from "./prisma.client.ts";
import {AnnouncementPermissionsEnum} from "../src/enums/permissionEnums/announcement.permissions.enum.ts";
import {UserPermissionsEnum} from "../src/enums/permissionEnums/user.permissions.enum.ts";
import {DealershipPermissionsEnum} from "../src/enums/permissionEnums/dealership.permission.enum.ts";
import {BillingPermissionsEnum} from "../src/enums/permissionEnums/billing.permissions.enum.ts";
import {SubscriptionCodeEnum} from "../src/enums/SubcriptionCodeEnums/subscription.code.enum.ts";

export default async function main() {

    const plans = [...Object.values(SubscriptionCodeEnum)]
    for(let plan of plans){
        await prisma.subscriptionPlan.upsert({
            where: {code: plan},
            update: {},
            create: {code: plan, price: 0}
        })
    }

    const regions = [
        "Вінницька область",
        "Волинська область",
        "Дніпропетровська область",
        "Донецька область",
        "Житомирська область",
        "Закарпатська область",
        "Запорізька область",
        "Івано-Франківська область",
        "Київська область",
        "Кіровоградська область",
        "Луганська область",
        "Львівська область",
        "Миколаївська область",
        "Одеська область",
        "Полтавська область",
        "Рівненська область",
        "Сумська область",
        "Тернопільська область",
        "Харківська область",
        "Херсонська область",
        "Хмельницька область",
        "Черкаська область",
        "Чернівецька область",
        "Чернігівська область"
    ]

    for (const regionName of regions) {
        await prisma.region.upsert({
            where: { name: regionName},
            update: {},
            create: { name: regionName }
        })
    }

    const permissions = [

        //ANNOUNCEMENTS
        ...Object.values(AnnouncementPermissionsEnum),

        //USERS
        ...Object.values(UserPermissionsEnum),

        //DEALERSHIPS
        ...Object.values(DealershipPermissionsEnum),

        //Billing
        ...Object.values(BillingPermissionsEnum),
    ];

    const roles = [
        "user",
        "manager",
        "admin"
    ]

    const managerPermissions = [
        UserPermissionsEnum.READ,
        UserPermissionsEnum.MODERATE,
        AnnouncementPermissionsEnum.READ,
        AnnouncementPermissionsEnum.MANAGE,
        AnnouncementPermissionsEnum.MODERATE,
    ];

    const rolePermissionsMap: {[p: string]: string[]} = {
        user: [],
        manager: managerPermissions,
        admin: permissions,
    };

    const roleId: {[p: string]: number} = {}
    const permissionId: {[p: string]: number} = {}

    for (const permission of permissions) {
        permissionId[permission] = (await prisma.permission.upsert({
            where: { name: permission },
            update: {},
            create: { name: permission }
        })).id;
    }

    for (const role of roles) {
        roleId[role] = (await prisma.role.upsert({
            where: { name: role },
            update: {},
            create: { name: role }
        })).id;
    }

    for(const role of roles){
        const role_id = roleId[role]
        const permissions = rolePermissionsMap[role]
        if(permissions.length !== 0){
            for(const permission of permissions){
                const permission_id = permissionId[permission]
                await prisma.rolePermission.upsert({
                    where: {
                        role_id_permission_id: {role_id, permission_id}
                    },
                    update: {},
                    create: {role_id, permission_id}
                })
            }
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => console.log("Done"));
