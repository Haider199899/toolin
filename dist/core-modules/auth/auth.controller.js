"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const firebase_auth_guard_1 = require("./guards/firebase-auth.guard");
const authenticated_user_decorator_1 = require("./decorators/authenticated-user.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleSignIn(idTokenDto) {
        try {
            const profile = await this.authService.ssoGoogleAndFacebook(idTokenDto, 'google');
            return {
                message: 'User sign in successfully using Google',
                profile,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async facebookSignIn(idTokenDto) {
        try {
            const profile = await this.authService.ssoGoogleAndFacebook(idTokenDto, 'facebook');
            return {
                message: 'User sign in successfully using Facebook',
                profile,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async updatePassword(user, updatePassword) {
        try {
            await this.authService.updatePassword(user, updatePassword);
            return {
                message: 'Password updated successfully',
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login a user using Google' }),
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.IdTokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login a user using Google' }),
    (0, common_1.Post)('facebook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.IdTokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login a user using Google' }),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Post)('update-password'),
    __param(0, (0, authenticated_user_decorator_1.AuthenticatedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.UpdatePasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map