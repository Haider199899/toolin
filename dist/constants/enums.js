"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthProviders = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "admin";
    UserRoles["USER"] = "user";
    UserRoles["PASSWORD"] = "provider";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
var FirebaseAuthProviders;
(function (FirebaseAuthProviders) {
    FirebaseAuthProviders["PASSWORD"] = "password";
    FirebaseAuthProviders["GOOGLE"] = "google";
    FirebaseAuthProviders["FACEBOOK"] = "facebook";
})(FirebaseAuthProviders || (exports.FirebaseAuthProviders = FirebaseAuthProviders = {}));
//# sourceMappingURL=enums.js.map