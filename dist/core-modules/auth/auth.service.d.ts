import { IdTokenDTO, UpdatePasswordDTO } from './dto/auth.dto';
import { ICreatedUser } from '../../shared/interfaces/created-user.interface';
import { UserService } from '../user/user.service';
import { IIdTokenResponse } from './interfaces/auth.interfaces';
import { HasingService } from "../../shared/bcrypt/hashing";
export declare class AuthService {
    private readonly userService;
    private readonly hashService;
    private usersCollection;
    constructor(userService: UserService, hashService: HasingService);
    verifyToken(idToken: string): Promise<IIdTokenResponse>;
    registerUser(user: ICreatedUser): Promise<void>;
    ssoGoogleAndFacebook(idTokenDTO: IdTokenDTO, authMethod: string): Promise<any>;
    updatePassword(user: IIdTokenResponse, updatePassword: UpdatePasswordDTO): Promise<void>;
}
