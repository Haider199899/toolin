import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../../constants/enums';

export class IdTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idToken: string;
}

export class CreateUserDTO {
  @ApiProperty({
    required: true,
  })
  @IsString()
  uid: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: false,
    enum: UserRoles,
    default : UserRoles.USER
  })
  @IsEnum(UserRoles)
  role: UserRoles = UserRoles.USER;
}

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UpdatePasswordDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
