import bcrypt from "bcrypt";
class PasswordService {
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}
export const passwordService = new PasswordService();
//# sourceMappingURL=password.service.js.map