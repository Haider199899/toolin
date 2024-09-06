import { UserRoles } from '../../../constants/enums';
export declare class IdTokenDTO {
    idToken: string;
}
export declare class CreateUserDTO {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    role: UserRoles;
}
export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class ForgotPasswordDTO {
    email: string;
}
export declare class UpdatePasswordDTO {
    newPassword: string;
}
