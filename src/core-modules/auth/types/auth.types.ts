import { ApiProperty } from '@nestjs/swagger';
import { ICreatedUser } from '../../../shared/interfaces/created-user.interface';

export class ResetTokenResponseType {
  @ApiProperty()
  resetToken: string;
}

export class UserProfileResponseType {
  @ApiProperty()
  message: string;

  @ApiProperty()
  profile: ICreatedUser;
}
