import { UserService } from './user.service';
import { CreateUserDTO } from '../auth/dto/auth.dto';
import { UserProfileResponseType } from '../auth/types/auth.types';
import { IIdTokenResponse } from '../auth/interfaces/auth.interfaces';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDTO): Promise<UserProfileResponseType>;
    getProfile(user: IIdTokenResponse): Promise<{
        message: string;
        profile: object;
    }>;
}
