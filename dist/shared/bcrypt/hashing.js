"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasingService = void 0;
const bcrypt = require("bcrypt");
class HasingService {
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async validatePassword(plainTextPassword, hashedPassword) {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }
}
exports.HasingService = HasingService;
//# sourceMappingURL=hashing.js.map