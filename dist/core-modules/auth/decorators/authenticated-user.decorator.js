"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthenticatedUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return data ? user[data] : user;
});
//# sourceMappingURL=authenticated-user.decorator.js.map