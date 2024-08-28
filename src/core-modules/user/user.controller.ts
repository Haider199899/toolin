import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { CreateUserDTO } from '../auth/dto/auth.dto';
import { UserProfileResponseType } from '../auth/types/auth.types';
import { IIdTokenResponse } from '../auth/interfaces/auth.interfaces';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @Post('create')
  @UseGuards(FirebaseAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDTO):Promise<UserProfileResponseType> {
      const profile = await this.userService.createUser(createUserDto);
      return {
        message : "Success",
        profile 
      }   
  }

  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @UseGuards(FirebaseAuthGuard)
  async getProfile(@AuthenticatedUser() user:IIdTokenResponse) {
      const profile = await this.userService.getUserProfile(user.uid)
       return {
       message : "Success",
       profile 
       }
  }
}
