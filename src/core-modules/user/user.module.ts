import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { HasingService } from '../../shared/bcrypt/hashing';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService,HasingService],
  exports : [UserService]
})
export class UserModule {}
