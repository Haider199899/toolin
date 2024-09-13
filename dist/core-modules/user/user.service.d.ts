import { CreateUserDTO } from '../auth/dto/auth.dto';
import { ICreatedUser } from '../../shared/interfaces/created-user.interface';
import { HasingService } from '../../shared/bcrypt/hashing';
export declare class UserService {
    private readonly hashService;
    private usersCollection;
    constructor(hashService: HasingService);
    createUser(createUserDto: CreateUserDTO): Promise<ICreatedUser>;
    getUserProfile(uid: string): Promise<any>;
    findUserById(userId: string): Promise<any>;
    findUserByEmail(email: string): Promise<any | null>;
}
