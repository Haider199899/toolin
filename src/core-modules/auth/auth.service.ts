import { Injectable, UnauthorizedException } from '@nestjs/common';
import { auth, db } from '../../config/firebase-config';
import { IdTokenDTO, UpdatePasswordDTO } from './dto/auth.dto';
import { ICreatedUser } from '../../shared/interfaces/created-user.interface';
import { UserService } from '../user/user.service';
import { UserRoles } from '../../constants/enums';
import { IIdTokenResponse } from './interfaces/auth.interfaces';
import { getFirstAndLastName } from '../../shared/utils/naming.utils';
import { HasingService } from '../../shared/bcrypt/hashing';
import { trackingDates } from '../../shared/utils/tracking-fields';

@Injectable()
export class AuthService {
  private usersCollection: FirebaseFirestore.CollectionReference;
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HasingService,
  ) {
    this.usersCollection = db.collection('users');
  }
  async verifyToken(idToken: string): Promise<IIdTokenResponse> {
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      return {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'Unauthorized user. Invalid access token.',
      );
    }
  }

  async registerUser(user: ICreatedUser) {
    const password = await this.hashService.hashPassword(user.password);
    user.password = password;
    await this.usersCollection.doc(user.uid).set(user);
  }

  async ssoGoogleAndFacebook(idTokenDTO: IdTokenDTO, authMethod: string) {
    const userData: IIdTokenResponse = await this.verifyToken(
      idTokenDTO.idToken,
    );

    // Step 1: Check if a user with the same email exists in your system (Firestore)
    const userFoundByEmail = await this.userService.findUserByEmail(
      userData.email,
    );

    if (userFoundByEmail) {
      return userFoundByEmail;
    }

    // Step 2: If no existing user with the same email, create a new user
    const userDocRef = db.doc(`users/${userData.uid}`);
    const userFound = await userDocRef.get();

    if (userFound.exists) {
      return userFound.data();
    }

    // Create the new user in Firestore
    const { firstName, lastName } = getFirstAndLastName(userData.name);
    const createdUser: ICreatedUser = {
      uid: userData.uid,
      firstName,
      lastName,
      email: userData.email,
      password: userData.uid, // Use the UID as the password placeholder
      address: null,
      role: UserRoles.USER,
      authMethod,
      ...trackingDates,
    };

    await this.registerUser(createdUser);
    return createdUser;
  }
  async updatePassword(
    user: IIdTokenResponse,
    updatePassword: UpdatePasswordDTO,
  ) {
    const userRef = this.usersCollection.doc(user.uid);
    await userRef.update({
      password: updatePassword.newPassword,
      updatedAt: new Date().toISOString(),
    });
  }
}
