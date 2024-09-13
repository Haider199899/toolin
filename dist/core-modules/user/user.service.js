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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase-config");
const hashing_1 = require("../../shared/bcrypt/hashing");
const enums_1 = require("../../constants/enums");
const tracking_fields_1 = require("../../shared/utils/tracking-fields");
let UserService = class UserService {
    constructor(hashService) {
        this.hashService = hashService;
        this.usersCollection = firebase_config_1.db.collection('users');
    }
    async createUser(createUserDto) {
        const password = await this.hashService.hashPassword(createUserDto.password);
        createUserDto.password = password;
        createUserDto.role = createUserDto.role || enums_1.UserRoles.USER;
        const userRecord = {
            ...createUserDto,
            ...tracking_fields_1.trackingDates,
            authMethod: enums_1.FirebaseAuthProviders.PASSWORD,
        };
        await this.usersCollection.doc(createUserDto.uid).set(userRecord);
        delete userRecord.password;
        return userRecord;
    }
    async getUserProfile(uid) {
        return this.findUserById(uid);
    }
    async findUserById(userId) {
        const userFound = await firebase_config_1.db.doc(`users/${userId}`).get();
        if (!userFound.exists) {
            throw new common_1.NotFoundException('User Not found!');
        }
        return userFound.data();
    }
    async findUserByEmail(email) {
        const querySnapshot = await this.usersCollection
            .where('email', '==', email)
            .get();
        if (querySnapshot.empty) {
            throw new common_1.NotFoundException('User not found!');
        }
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return userData;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hashing_1.HasingService])
], UserService);
//# sourceMappingURL=user.service.js.map