import { AuthService } from './auth.service';
import { IdTokenDTO, UpdatePasswordDTO } from './dto/auth.dto';
import { IIdTokenResponse } from './interfaces/auth.interfaces';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleSignIn(idTokenDto: IdTokenDTO): Promise<{
        message: string;
        profile: any;
    }>;
    facebookSignIn(idTokenDto: IdTokenDTO): Promise<{
        message: string;
        profile: any;
    }>;
    updatePassword(user: IIdTokenResponse, updatePassword: UpdatePasswordDTO): Promise<{
        message: string;
    }>;
}
