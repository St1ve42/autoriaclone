import type { Role } from "../../prisma/src/generated/prisma/client.ts";
declare class RoleRepository {
    getRoleByName(name: string): Promise<Role | null>;
    getRoleById(id: number): Promise<Role | null>;
}
export declare const roleRepository: RoleRepository;
export {};
//# sourceMappingURL=role.repository.d.ts.map