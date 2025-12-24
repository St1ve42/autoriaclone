declare class RoleService {
    getRoleName(id: number): Promise<string>;
    getRoleId(name: string): Promise<number>;
    getCustomerId(): Promise<number>;
}
export declare const roleService: RoleService;
export {};
//# sourceMappingURL=role.service.d.ts.map