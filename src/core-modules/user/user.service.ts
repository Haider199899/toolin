import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../config/firebase-config';
import { CreateUserDTO } from '../auth/dto/auth.dto';
import { ICreatedUser } from '../../shared/interfaces/created-user.interface';
import { HasingService } from '../../shared/bcrypt/hashing';
import { FirebaseAuthProviders, UserRoles } from '../../constants/enums';
import { trackingDates } from '../../shared/utils/tracking-fields';

@Injectable()
export class UserService {
  private usersCollection: FirebaseFirestore.CollectionReference;
  constructor(private readonly hashService : HasingService) {
    this.usersCollection = db.collection('users')
  }
  async createUser(createUserDto : CreateUserDTO):Promise<ICreatedUser>{
    const password = await this.hashService.hashPassword(createUserDto.password)
    createUserDto.password = password
    createUserDto.role = createUserDto.role || UserRoles.USER;
    const userRecord = {...createUserDto,...trackingDates, authMethod: FirebaseAuthProviders.PASSWORD}
    await this.usersCollection.doc(createUserDto.uid).set(userRecord); 
    delete userRecord.password;
    return userRecord
  }

  async getUserProfile(uid : string){
      return this.findUserById(uid)
  }
  async findUserById(userId: string): Promise<object> {
    const userFound = await db.doc(`users/${userId}`).get();
    if(!userFound.exists){
      throw new NotFoundException('User Not found!')
    }
    return userFound.data()
  }
  async findUserByEmail(email: string): Promise<any | null> {
      const querySnapshot = await this.usersCollection.where('email', '==', email).get();
  
      if (querySnapshot.empty) {
        throw new  NotFoundException('User not found!');
      }
      // Assuming there's only one document per email
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
  
      return userData;
  }
}
