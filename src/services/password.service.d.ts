declare class PasswordService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
export declare const passwordService: PasswordService;
export {};
//# sourceMappingURL=password.service.d.ts.map