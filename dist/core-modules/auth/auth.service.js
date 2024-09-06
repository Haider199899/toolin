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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase-config");
const user_service_1 = require("../user/user.service");
const enums_1 = require("../../constants/enums");
const naming_utils_1 = require("../../shared/utils/naming.utils");
const hashing_1 = require("../../shared/bcrypt/hashing");
const tracking_fields_1 = require("../../shared/utils/tracking-fields");
let AuthService = class AuthService {
    constructor(userService, hashService) {
        this.userService = userService;
        this.hashService = hashService;
        this.usersCollection = firebase_config_1.db.collection('users');
    }
    async verifyToken(idToken) {
        try {
            const decodedToken = await firebase_config_1.auth.verifyIdToken(idToken);
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Unauthorized user. Invalid access token.');
        }
    }
    async registerUser(user) {
        const password = await this.hashService.hashPassword(user.password);
        user.password = password;
        await this.usersCollection.doc(user.uid).set(user);
    }
    async ssoGoogleAndFacebook(idTokenDTO, authMethod) {
        const userData = await this.verifyToken(idTokenDTO.idToken);
        const userFoundByEmail = await this.userService.findUserByEmail(userData.email);
        if (userFoundByEmail) {
            return userFoundByEmail;
        }
        const userDocRef = firebase_config_1.db.doc(`users/${userData.uid}`);
        const userFound = await userDocRef.get();
        if (userFound.exists) {
            return userFound.data();
        }
        const { firstName, lastName } = (0, naming_utils_1.getFirstAndLastName)(userData.name);
        const createdUser = {
            uid: userData.uid,
            firstName,
            lastName,
            email: userData.email,
            password: userData.uid,
            address: null,
            role: enums_1.UserRoles.USER,
            authMethod,
            ...tracking_fields_1.trackingDates
        };
        await this.registerUser(createdUser);
        return createdUser;
    }
    async updatePassword(user, updatePassword) {
        const userRef = this.usersCollection.doc(user.uid);
        await userRef.update({
            password: updatePassword.newPassword,
            updatedAt: new Date().toISOString()
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        hashing_1.HasingService])
], AuthService);
//# sourceMappingURL=auth.service.js.map