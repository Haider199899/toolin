import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  IdTokenDTO,
  UpdatePasswordDTO,
} from './dto/auth.dto';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';
import { IIdTokenResponse } from './interfaces/auth.interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Login a user using Google' })
  @Post('google')
  async googleSignIn(@Body() idTokenDto:IdTokenDTO) {
    try {
       const profile = await this.authService.ssoGoogleAndFacebook(idTokenDto,"google");
       return {
         message : "User sign in successfully using Google",
         profile 
       }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @ApiOperation({ summary: 'Login a user using Google' })
  @Post('facebook')
  async facebookSignIn(@Body() idTokenDto:IdTokenDTO) {
    try {
       const profile = await this.authService.ssoGoogleAndFacebook(idTokenDto,"facebook");
       return {
         message : "User sign in successfully using Facebook",
         profile 
       }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @ApiOperation({ summary: 'Login a user using Google' })
  @UseGuards(FirebaseAuthGuard)
  @Post('update-password')
  async updatePassword(@AuthenticatedUser() user : IIdTokenResponse, @Body() updatePassword:UpdatePasswordDTO) {
    try {
       await this.authService.updatePassword(user,updatePassword);
       return {
         message : "Password updated successfully",
       }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
