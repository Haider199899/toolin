export declare class HasingService {
    hashPassword(password: string): Promise<string>;
    validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
